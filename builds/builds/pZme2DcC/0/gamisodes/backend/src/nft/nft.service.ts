import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetConfigService } from 'src/config/config.service';
import { ModelNFTs, NFTs } from 'src/db/entity';
import {
  GetNftsQuery,
  NftModelQuery,
  NftsByWalletQuery,
  TransferNftToWalletMutation,
  WalletState,
} from 'src/niftory-api/graphql';
import { NiftoryApiService } from 'src/niftory-api/niftory-api.service';
import { ErrorsEnum, MessagesEnum } from 'src/shared/types';
import { UsersService } from 'src/users/users.service';
import {
  DeepPartial,
  FindOperator,
  FindOptionsWhere,
  In,
  IsNull,
  Repository,
} from 'typeorm';
import { IGetNFTOpt } from './types';
import { SuccessResponse, isWallet } from 'src/shared/utils';
import { MarketplaceTransferDto } from './dto';

@Injectable()
export class NftService {
  private readonly logger: Logger;

  @InjectRepository(NFTs)
  private readonly nftsRepo: Repository<NFTs>;

  constructor(
    private readonly nService: NiftoryApiService,
    private readonly userService: UsersService,
    private readonly configService: GetConfigService,
  ) {
    this.logger = new Logger('NftService');
  }

  async notFulfillmentsNfts(
    ids: string[],
    revers?: boolean,
  ): Promise<GetNftsQuery['nfts']['items']> {
    const nft = await this.nService.getNfts(ids);
    return nft?.['items'].reduce((accum, nft) => {
      if (nft.saleState === 'FULFILLED')
        return revers ? [...accum, nft] : accum;
      return revers ? accum : [...accum, nft];
    }, []);
  }

  async nftModelInitCheckout(userId: string, nftModelId: string) {
    const {
      custodialWallet: { niftoryWalletId },
    } = await this.userService.getOne(userId, { custodialWallet: true });
    const {
      walletById: { state, address },
    } = await this.nService.walletById(niftoryWalletId);
    if (state !== WalletState.Ready)
      throw new BadRequestException({
        statusCode: 400,
        message: [ErrorsEnum.NeedCustodialWallet],
      });

    const nftModel = await this.nService.nftModelById(nftModelId);
    const nftModelPrice = +nftModel?.nftModel?.attributes?.price;
    const price = isNaN(nftModelPrice)
      ? this.configService.safeGet('DEFAULT_NFT_PRICE')
      : nftModelPrice;

    if (price > 0)
      return (
        await this.nService.checkoutWithDapperWallet(nftModelId, address, price)
      ).checkoutWithDapperWallet;

    if (price !== 0)
      throw new HttpException({ message: [ErrorsEnum.NftLimitReached] }, 400);

    return await this.getFreeNft(address, nftModel);
  }

  async nftModelCompleteCheckout(transactionId: string, nftDatabaseId: string) {
    return (
      await this.nService.completeCheckoutWithDapperWallet(
        transactionId,
        nftDatabaseId,
      )
    ).completeCheckoutWithDapperWallet;
  }

  async getFreeNft(address: string, nftModelId: string | NftModelQuery) {
    return (await this.getNft(address, nftModelId, { freeNft: true }))?.[
      'transfer'
    ];
  }

  async availableQuantity(
    nftModelId: string | NftModelQuery,
    address?: string,
  ) {
    const { nftModel } =
      typeof nftModelId === 'string'
        ? await this.nService.nftModelById(nftModelId)
        : nftModelId;
    if (nftModel) return {};
    let available = nftModel?.quantity - nftModel.quantityMinted;
    available =
      available < nftModel.attributes?.maxNftForUser
        ? available
        : nftModel.attributes?.maxNftForUser;

    let owned: number;
    if (address)
      owned = (await this.listNftsOfWallets(address, nftModel.id)).length;

    return { owned, available };
  }

  async getNft(
    address: string,
    nftModelId: string | NftModelQuery,
  ): Promise<TransferNftToWalletMutation>;
  async getNft(
    address: string,
    nftModelId: string | NftModelQuery,
    { quantity }: IGetNFTOpt,
  ): Promise<TransferNftToWalletMutation[]>;
  async getNft(
    address: string,
    nftModelId: string | NftModelQuery,
    { freeNft }: IGetNFTOpt,
  ): Promise<TransferNftToWalletMutation>;
  async getNft(
    address: string,
    nftModelId: string | NftModelQuery,
    { freeNft, quantity }: IGetNFTOpt = {},
  ): Promise<TransferNftToWalletMutation | TransferNftToWalletMutation[]> {
    const { nftModel } =
      typeof nftModelId === 'string'
        ? await this.nService.nftModelById(nftModelId)
        : nftModelId;
    const maxNftForUser = +nftModel?.attributes?.maxNftForUser || 0;

    if (!nftModel) {
      this.logger.error(`NFT model by id ${nftModelId}, not exist`);
      return;
    }

    if (freeNft && Number(nftModel?.attributes?.price) !== 0)
      throw new HttpException(ErrorsEnum.NftNotFree, 400);
    if (nftModel?.quantity <= nftModel.quantityMinted)
      throw new HttpException(ErrorsEnum.NftAllSold, 400);
    this.logger.debug(`maxNftForUser \x1b[33m${maxNftForUser}`);
    if (maxNftForUser === 0)
      return await this.transferOneOrMany(address, nftModel.id, quantity);

    const nftsItems = await this.listNftsOfWallets(address, nftModel.id);
    this.logger.debug(`nftsItems.length \x1b[33m${nftsItems.length}`);

    if (nftsItems.length >= maxNftForUser || quantity <= nftsItems.length)
      throw new HttpException({ message: [ErrorsEnum.NftLimitReached] }, 400);
    return await this.transferOneOrMany(address, nftModel.id, quantity);
  }

  async listNftsOfWallets(address: string, nftModelId: string) {
    let cursor = '';
    const nftsItems: NftsByWalletQuery['nftsByWallet']['items'] = [];

    while (typeof cursor === 'string') {
      const { nftsByWallet } = await this.nService.nftsOfWalletsByModel(
        address,
        nftModelId,
        cursor,
      );
      nftsItems.push(...nftsByWallet?.items);
      cursor = nftsByWallet?.cursor;
    }

    return nftsItems;
  }

  async transferToDapper(id: string, userId: string) {
    const user = await this.userService.getOne(userId, {
      custodialWallet: true,
      wallet: true,
    });
    if (!user?.custodialWallet || !user?.wallet)
      throw new HttpException(ErrorsEnum.MustBeHavingCustodialAndDapper, 400);

    const res = await this.nService.walletById(
      user.custodialWallet.niftoryWalletId,
    );
    if (res.walletById?.state !== WalletState.Ready)
      throw new BadRequestException({
        statusCode: 400,
        message: [ErrorsEnum.NeedDapperWallet],
      });

    return await this.nService.withdraw(
      id,
      res.walletById.address,
      user.wallet.address,
    );
  }

  async nftById(id: string) {
    return await this.nService.nftById(id);
  }

  async transferNftToUser(
    nftId: string,
    userId: string,
    waitTransfer?: boolean,
  ) {
    let address = (
      await this.userService.getOne({ id: userId }, { custodialWallet: true })
    ).custodialWallet.niftoryWalletId;
    await this.nftsRepo.update({ niftoryId: nftId }, { userId });
    await this.nService.transferById(address, nftId, waitTransfer);
  }

  async transferToTrash(nftId: string, walletOrUserId?: string) {
    await this.nftsRepo.delete({ niftoryId: nftId });
    if (!walletOrUserId)
      return await this.nService.transferById(
        this.configService.safeGet('TRASH_WALLET'),
        nftId,
      );
    if (!isWallet(walletOrUserId))
      walletOrUserId = (
        await this.userService.getOne(
          { id: walletOrUserId },
          { custodialWallet: true },
        )
      ).custodialWallet?.niftoryWalletId;
    if (!walletOrUserId) throw Error('Need wallet');
    return await this.nService.transferBetweenWallets(
      nftId,
      this.configService.safeGet('TRASH_WALLET'),
      walletOrUserId,
    );
  }

  async transferOneOrMany(
    address: string,
    nftModelId: string,
    quantity?: number,
  ): Promise<TransferNftToWalletMutation | TransferNftToWalletMutation[]> {
    if (!quantity) return await this.nService.transfer(address, nftModelId);
    const transfers = [];
    for (let i = 0; i < quantity; i++) {
      const transfer = await this.nService.transfer(address, nftModelId);
      transfers.push(transfer);
    }
    return transfers;
  }

  async findNftFromDB(where: FindOptionsWhere<NFTs>) {
    return await this.nftsRepo.findOne({
      where,
      order: { serialNumber: 'asc' },
    });
  }

  async saveNftToDB(nftP: DeepPartial<NFTs> | DeepPartial<NFTs>[]) {
    nftP = Array.isArray(nftP) ? nftP : [nftP];
    const nft = this.nftsRepo.create(nftP);
    return (
      await this.nftsRepo
        .createQueryBuilder()
        .insert()
        .values(nft)
        .orUpdate(['serialNumber'], ['niftoryId'])
        .returning('*')
        .execute()
    )?.raw?.[0];
  }

  async deleteNftToDB(nftIds: FindOptionsWhere<NFTs>) {
    return await this.nftsRepo.delete(nftIds);
  }

  async getRandomNfts(
    modelId: string | string[] | FindOperator<string>,
    model?: DeepPartial<ModelNFTs>,
  ) {
    if (Array.isArray(modelId)) modelId = In(modelId);
    const count = await this.nftsRepo.count({
      where: { model, modelId, userId: IsNull() },
    });
    const skip = Math.floor(Math.random() * count);
    const [nft] = await this.nftsRepo.find({
      where: { model, modelId, userId: IsNull() },
      skip,
      take: 1,
    });
    return nft;
  }

  async findAndTransferNft(
    modelId: string,
    userId?: string,
    waitTransfer?: boolean,
  ) {
    const nft = await this.findNftFromDB({ modelId, userId: IsNull() });
    if (userId)
      await this.transferNftToUser(nft.niftoryId, userId, waitTransfer);
    else await this.transferToTrash(nft.niftoryId);
    return nft;
  }

  async transferToUserInDb({
    level,
    recipientAddress,
    serialNumber,
    title,
  }: MarketplaceTransferDto) {
    const user = await this.userService.getOne(
      { magicWallet: { address: recipientAddress } },
      { magicWallet: true },
    );
    const nft = await this.nftsRepo.findOne({
      where: { serialNumber, model: { title, m_level: level } },
      relations: { model: true },
    });
    if (!nft) throw new BadRequestException(ErrorsEnum.NftNotExist);
    await this.nftsRepo.save({ id: nft.id, userId: user.id });
    return new SuccessResponse(MessagesEnum.SUCCESSFUL);
  }
}
