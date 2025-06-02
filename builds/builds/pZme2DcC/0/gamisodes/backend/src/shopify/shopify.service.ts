import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PendingOrders, User } from 'src/db/entity';
import { NftService } from 'src/nft/nft.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SHOPIFY_OPTIONS_PROVIDER } from './constants';
import { IAsyncOptions, IMetafields } from './types';
import { GroupsNFTService } from 'src/groupsNfts/groupsNfts.service';
import { WalletService } from 'src/wallet/wallet.service';

interface IProcessingItemParam {
  user: User;
  orderItems: any[];
  orderId: number;
}
interface ILineItemParam {
  lineItemId: string;
  quantity: number;
  metadata: IMetafields['custom'];
}

interface OProcessingParams {
  lineItemId: string;
  quantity: number;
  modelId?: string;
  groupId?: string;
}

@Injectable()
export class ShopifyService implements OnModuleInit {
  private readonly shopifyUrl: string;
  private readonly logger: Logger;

  @InjectRepository(PendingOrders)
  private readonly pendingOrderRepo: Repository<PendingOrders>;

  constructor(
    @Inject(SHOPIFY_OPTIONS_PROVIDER) private readonly options: IAsyncOptions,
    private readonly httpService: HttpService,
    private readonly nftService: NftService,
    private readonly userService: UsersService,
    private readonly groupService: GroupsNFTService,
    private readonly walletService: WalletService,
  ) {
    this.shopifyUrl = `https://${options.storeName}.myshopify.com/admin/api/${
      options.apiVersion || '2023-07'
    }`;
    this.logger = new Logger('ShopifyService');
  }

  async timeout(sec: number = 3000) {
    await new Promise(async (res, rej) =>
      setTimeout(async () => {
        try {
          const orders = await this.pendingOrderRepo.find();
          if (!orders.length) return res(true);
          for (const { nftIds, lineItemId, orderId, id, quantity } of orders) {
            const ids = (await this.nftService.notFulfillmentsNfts(nftIds)).map(
              ({ id }) => id,
            );
            if (ids.length) {
              this.pendingOrderRepo.save({ id, nftIds: ids });
              continue;
            }
            await this.fulfilledItem(orderId, lineItemId, quantity);
            await this.pendingOrderRepo.delete(id);
          }
          res(true);
        } catch (err) {
          rej(err);
        }
      }, sec),
    ).catch((err) => this.logger.error(err.errors));
    await this.timeout(sec);
  }

  async onModuleInit() {
    this.timeout(this.options.timeoutTime);
    await this.createWebhook({
      address: `${this.options.webhookUrl}/orders/paid`,
      topic: 'orders/paid',
      format: 'json',
    });
  }

  async shopifyRequest(path: string, method: keyof HttpService, data?: any) {
    const res = data
      ? await this.httpService.axiosRef[method](
          `${this.shopifyUrl}/${path}`,
          data,
          { headers: { 'X-Shopify-Access-Token': this.options.accessToken } },
        )
      : await this.httpService.axiosRef[method](`${this.shopifyUrl}/${path}`, {
          headers: { 'X-Shopify-Access-Token': this.options.accessToken },
        });
    return res.data;
  }

  async createWebhook(webhook: Record<string, string>) {
    await this.shopifyRequest('webhooks.json', 'post', { webhook }).catch(
      (err) => {
        const mess = err.response.data?.errors?.address?.[0];
        if (mess !== 'for this topic has already been taken')
          this.logger.error(err.response.data);
        this.logger.log('Webhook already exist');
      },
    );
  }

  async fulfilledItem(
    fulfillmentOrderId: number,
    lineItemId: number,
    quantity: number,
  ) {
    await this.shopifyRequest('fulfillments.json', 'post', {
      fulfillment: {
        message: 'The NFT was transfer on your wallet.',
        notify_customer: false,
        line_items_by_fulfillment_order: [
          {
            fulfillment_order_id: fulfillmentOrderId,
            fulfillment_order_line_items: [{ id: lineItemId, quantity }],
          },
        ],
      },
    }).catch((err) => {
      const mess = err.response.data?.errors?.address?.[0];
      if (mess !== 'Invalid fulfillment order line item quantity requested.')
        return this.logger.error(err.response.data);
      this.logger.debug(
        `Item ${lineItemId} of order ${fulfillmentOrderId} already fulfilled`,
      );
    });
  }

  async getProductMetafields(productId: number): Promise<IMetafields> {
    const meatfieldsArray = (
      await this.shopifyRequest(`products/${productId}/metafields.json`, 'get')
    ).metafields;
    return meatfieldsArray.reduce(
      (accum, { namespace, key, value }) => ({
        ...accum,
        [namespace]: { ...(accum[namespace] || {}), [key]: value },
      }),
      {},
    );
  }

  async ordersPaid(data: any) {
    let user = await this.userService.getOne(
      { email: data.email },
      { wallet: true, custodialWallet: true },
    );
    if (!user) user = await this.userService.create({ email: data.email });
    if (!user.custodialWallet)
      user.custodialWallet = await this.walletService.createCustodialWallet(
        data.email,
      );

    const groupUpgradeMatrix: Record<string, string> = {};
    const orders: Partial<PendingOrders>[] = [];
    const items: Partial<ILineItemParam>[] = [];
    const { id: orderId, line_items: orderItems } =
      await this.getFulfillmentOrders(data.id);
    for (const { product_id, quantity, id: lineItemId } of data.line_items) {
      const metafields = (await this.getProductMetafields(product_id))?.custom;
      if (metafields?.upgradegroupid && metafields?.groupid) {
        groupUpgradeMatrix[metafields?.groupid] = metafields.upgradegroupid;
        continue;
      }
      items.push({ lineItemId, quantity, metadata: metafields });
    }
    for (const {
      lineItemId,
      quantity,
      metadata: { groupid: groupId, nftmodelid },
    } of items)
      orders.push(
        await this.processingItem(
          {
            quantity,
            groupId: groupUpgradeMatrix[groupId] || groupId,
            modelId: nftmodelid,
            lineItemId,
          },
          { orderId, orderItems, user },
        ),
      );
    await this.pendingOrderRepo.save(this.pendingOrderRepo.create(orders));
  }

  async processingItem(
    { groupId, modelId, quantity, lineItemId }: OProcessingParams,
    { orderId, orderItems, user }: IProcessingItemParam,
  ) {
    const nfts = modelId
      ? (
          await this.nftService.getNft(
            user.wallet?.address || user.custodialWallet?.niftoryWalletId,
            String(modelId),
            { quantity },
          )
        ).map(({ transfer: { id } }) => id)
      : await this.groupService.transferMAnyGroups(groupId, user.id, quantity);
    const orderItemId = orderItems.find(
      ({ line_item_id }) => line_item_id === lineItemId,
    ).id;
    return {
      lineItemId: orderItemId,
      nftIds: nfts,
      orderId,
      quantity,
    };
  }

  async processingGroup(
    { product_id, quantity, id: lineItemId }: any,
    { orderId, orderItems, user: { id: userId } }: IProcessingItemParam,
  ) {
    const metafields = (await this.getProductMetafields(product_id))?.custom;
    if (!metafields?.groupid) return;
    const nftIds = [];
    for (let i = 0; i < quantity; i++)
      nftIds.push(
        await this.groupService.transferAnyGroup(
          String(metafields?.groupid),
          userId,
        ),
      );

    const orderItemId = orderItems.find(
      ({ line_item_id }) => line_item_id === lineItemId,
    ).id;
    return {
      lineItemId: orderItemId,
      nftIds,
      orderId,
      quantity,
    };
  }

  async getFulfillmentOrders(orderId: number) {
    const fOrder = await this.shopifyRequest(
      `orders/${orderId}/fulfillment_orders.json`,
      'get',
    );
    return fOrder?.['fulfillment_orders']?.[0];
  }
}
