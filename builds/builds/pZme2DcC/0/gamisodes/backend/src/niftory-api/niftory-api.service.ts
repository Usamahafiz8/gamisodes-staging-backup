import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GetConfigService } from 'src/config/config.service';
import { requester } from 'src/shared/utils';
import { NIFTORY_OPTIONS_PROVIDER } from './constants';
import {
  getSdk,
  NftBlockchainState,
  NftsByWalletQuery,
  Requester,
  SaleState,
  Sdk,
} from './graphql';
import { IAsyncOptions } from './types';

@Injectable()
export class NiftoryApiService implements OnModuleInit {
  private sdk: Sdk;
  private requester: Requester;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: GetConfigService,
    @Inject(NIFTORY_OPTIONS_PROVIDER) private readonly options: IAsyncOptions,
  ) {}

  onModuleInit() {
    this.requester = requester(
      {
        url: this.options.url,
        accessToken: this.options.accessToken,
        secretToken: this.options.secretToken,
      },
      this.httpService.axiosRef,
    );
    this.sdk = getSdk(this.requester);
  }

  async getModels() {
    return await this.sdk.nftModels();
  }

  async model(modelId: string) {
    return await this.sdk.model({ id: modelId });
  }

  async updateModelMetadata(id: string, metadata: Record<string, string>) {
    return await this.sdk.updateNFTModel({ id, metadata });
  }

  async getNfts(ids: string[]) {
    return (await this.sdk.getNfts({ ids }))?.nfts;
  }

  async createCustodialWallet() {
    return await this.sdk.CreateNiftoryWallet({
      appId: this.configService.safeGet('PUBLIC_CLIENT_ID'),
    });
  }

  async verifyWallet(address: string, signedVerificationCode: any) {
    return await this.sdk.verifyWallet({ address, signedVerificationCode });
  }

  async readyWallet(address: string) {
    return await this.sdk.readyWallet({ address });
  }

  async registerWallet(address: string) {
    return await this.sdk.registerWallet({ address });
  }

  async walletByAddress(address: string) {
    return await this.sdk.walletByAddress({ address });
  }

  async walletById(id: string) {
    return await this.sdk.walletById({ id });
  }

  async nftModelById(nftModelId: string) {
    return await this.sdk.nftModel({ id: nftModelId });
  }

  async withdraw(id: string, custodialWalletId: string, dapperWallet: string) {
    return await this.sdk.withdraw({
      id,
      niftoryWalletAddress: custodialWalletId,
      receiverAddress: dapperWallet,
    });
  }

  async signTransaction(transaction: string) {
    return await this.sdk.signTransactionForDapperWallet({ transaction });
  }

  async checkoutWithDapperWallet(
    nftModelId: string,
    address: string,
    price: number,
  ) {
    return await this.sdk.CheckoutWithDapperWallet({
      nftModelId,
      address,
      price,
      expiry: Number.MAX_SAFE_INTEGER,
    });
  }

  async completeCheckoutWithDapperWallet(
    transactionId: string,
    nftDatabaseId: string,
  ) {
    return await this.sdk.CompleteCheckoutWithDapperWallet({
      transactionId,
      nftDatabaseId,
    });
  }

  async transfer(addressOrId: string, nftModelId: string) {
    const isAddress = /^0x[0-9a-f]{16}$/.test(addressOrId);
    return this.sdk.transferNFTToWallet({
      [isAddress ? 'address' : 'walletId']: addressOrId,
      nftModelId,
    });
  }

  async transferById(
    addressOrId: string,
    nftId: string,
    waitTransfer?: boolean,
  ) {
    const isAddress = /^0x[0-9a-f]{16}$/.test(addressOrId);
    let address = isAddress
      ? addressOrId
      : (await this.sdk.walletById({ id: addressOrId }))?.walletById?.address;
    console.log(`\x1b[33m${address}\x1b[0m`);
    let counter = 0;
    while (!address && counter < 200) {
      address = (await this.sdk.walletById({ id: addressOrId }))?.walletById
        ?.address;
      counter++;
    }
    if (!address) throw Error('Wallet creations timeout');
    console.log(`\x1b[32m${address}\x1b[0m`);
    const res = await this.sdk.transferById({
      address,
      id: nftId,
      force: true,
    });
    if (!waitTransfer) return res;
    let { nft } = await this.sdk.nft({ id: nftId });
    while (
      nft.saleState !== SaleState.Fulfilled &&
      nft.blockchainState !== NftBlockchainState.Error
    )
      nft = (await this.sdk.nft({ id: nftId })).nft;
    if (nft.blockchainState !== NftBlockchainState.Error) return res;
    console.log(`\x1b[31mBlockchain error\x1b[0m`, nft.blockchainState);
    return await this.sdk.transferById({ address, id: nftId, force: true });
  }

  async transferBetweenWallets(
    nftId: string,
    walletReceiver: string,
    walletSender: string,
  ) {
    const isAddressR = /^0x[0-9a-f]{16}$/.test(walletReceiver);
    const addressR = isAddressR
      ? walletReceiver
      : (await this.sdk.walletById({ id: walletReceiver }))?.walletById
          ?.address;

    const isAddressS = /^0x[0-9a-f]{16}$/.test(walletSender);
    const addressS = isAddressS
      ? walletSender
      : (await this.sdk.walletById({ id: walletSender }))?.walletById?.address;
    return await this.sdk.transferBetweenWallets({
      id: nftId,
      niftoryWalletAddress: addressS,
      receiverAddress: addressR,
    });
  }

  async nftsOfWalletsByModel(
    addressOrId: string,
    nftModelId: string,
    cursor: string = '',
  ) {
    const isAddress = /^0x[0-9a-f]{16}$/.test(addressOrId);
    return await this.sdk.nftsByWallet({
      [isAddress ? 'address' : 'walletId']: addressOrId,
      filter: { nftModelIds: [nftModelId] },
      cursor,
    });
  }

  async nftsOfWallets(addressOrId: string, cursor: string = '') {
    const isAddress = /^0x[0-9a-f]{16}$/.test(addressOrId);
    const nftsItems: NftsByWalletQuery['nftsByWallet']['items'] = [];
    while (typeof cursor === 'string') {
      const { nftsByWallet } = await this.sdk.nftsByWallet({
        [isAddress ? 'address' : 'walletId']: addressOrId,
        cursor,
      });
      nftsItems.push(...nftsByWallet?.items);
      cursor = nftsByWallet?.cursor;
    }
    return nftsItems;
  }

  async nftById(id: string) {
    return (await this.sdk.nft({ id }))?.nft;
  }
}
