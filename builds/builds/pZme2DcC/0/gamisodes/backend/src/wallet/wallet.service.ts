import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustodialWallet, NFTs, User, Wallet } from 'src/db/entity';
import { WalletByAddressQuery, WalletState } from 'src/niftory-api/graphql';
import { NiftoryApiService } from 'src/niftory-api/niftory-api.service';
import { ErrorsEnum } from 'src/shared/types';
import { SuccessResponse } from 'src/shared/utils';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  @InjectRepository(Wallet)
  private readonly WalletRepo: Repository<Wallet>;
  @InjectRepository(CustodialWallet)
  private readonly CustodialWalletRepo: Repository<CustodialWallet>;
  @InjectRepository(NFTs)
  private readonly nftsRepo: Repository<NFTs>;

  private readonly logger: Logger = new Logger('WalletService');

  constructor(
    private readonly nService: NiftoryApiService,
    private readonly userService: UsersService,
  ) {}

  async verifyWallet(address: string, signedVerificationCode: any) {
    return await this.nService.verifyWallet(address, signedVerificationCode);
  }

  async readyWallet(address: string) {
    return await this.nService.readyWallet(address);
  }

  async registerWallet({ email, wallet }: User, address: string) {
    const data = await this.nService.registerWallet(address);
    if (wallet) return data;

    const walletRecord = await this.WalletRepo.findOne({
      where: { address },
    });
    if (walletRecord)
      throw new BadRequestException({ messages: [ErrorsEnum.ThisWalletExist] });

    const newWallet = this.WalletRepo.create({ userEmail: email, address });
    await this.WalletRepo.save(newWallet);

    return data;
  }

  async checkWalletOwner(email: string, address: string) {
    const wallet = await this.WalletRepo.findOneBy({ address });
    if (wallet && wallet?.userEmail === email) return false;

    const user = await this.userService.getOne({ email }, { wallet: true });
    if (wallet || user?.wallet !== null) return true;

    const data = await this.nService.walletByAddress(address);
    if (!data.walletByAddress) return false;

    const newWallet = this.WalletRepo.create({
      address,
      userEmail: user.email,
    });
    await this.WalletRepo.save(newWallet);

    return false;
  }

  async getWallet(address: string) {
    return await this.WalletRepo.findOne({
      where: { address },
      relations: { user: true },
    });
  }

  async walletDisconnect(address: string) {
    const wallet = await this.getWallet(address);
    if (!wallet) return wallet;
    if (!wallet.user) return null;

    await this.WalletRepo.delete({ userEmail: wallet.user.email });
    return wallet;
  }

  /**
   * Create and save to db custodial wallet
   * @param userEmail
   */
  async createCustodialWallet(userEmail: string): Promise<CustodialWallet> {
    const { createNiftoryWallet } = await this.nService.createCustodialWallet();
    const { walletById } = await this.infoOfCustodialWallet(
      createNiftoryWallet.id,
    );
    if (walletById?.state !== WalletState.Ready)
      walletById.address = walletById.id;
    const cWallet = this.CustodialWalletRepo.create({
      niftoryWalletId: walletById.address,
      userEmail,
    });
    return (
      await this.CustodialWalletRepo.createQueryBuilder()
        .insert()
        .values(cWallet)
        .returning('*')
        .execute()
    )?.raw?.[0];
  }

  async infoOfCustodialWallet(walletId: string) {
    return await this.nService.walletById(walletId);
  }

  async updateCWalletAddress(cWallet: WalletByAddressQuery['walletByAddress']) {
    return await this.CustodialWalletRepo.update(
      { niftoryWalletId: cWallet.id },
      { niftoryWalletId: cWallet.address },
    );
  }

  async signTransaction(transaction: string) {
    const data = await this.nService.signTransaction(transaction);
    return data?.signTransactionForDapperWallet;
  }

  private async getCustodialWalletAddress(email: string) {
    const wallet = await this.CustodialWalletRepo.findOneBy({
      userEmail: email,
    });
    if (!wallet)
      throw new HttpException(`Wallet of '${email}' not found in DB`, 400);
    const addr = (await this.nService.walletById(wallet.niftoryWalletId))
      ?.walletById?.address;
    if (!addr) throw new HttpException(`Wallet of '${email}' not found`, 400);
    return addr;
  }

  async mergeWallets(
    fromUserEmail: string,
    toUserEmail: string,
    nftId?: string,
  ) {
    const fromWallet = await this.getCustodialWalletAddress(fromUserEmail);
    const toWallet = await this.getCustodialWalletAddress(toUserEmail);

    const recipient = await this.userService.getOne({ email: toUserEmail });

    if (nftId) {
      let res = true;
      await this.nService
        .transferBetweenWallets(nftId, toWallet, fromWallet)
        .catch(() => (res = false));
      return new SuccessResponse(nftId, res);
    }
    const nfts = await this.nService.nftsOfWallets(fromWallet);
    const brokenNFTs = [];
    for (const { id } of nfts)
      try {
        await this.nService.transferBetweenWallets(id, toWallet, fromWallet);
        await this.nftsRepo.update({ niftoryId: id }, { userId: recipient.id });
      } catch (err) {
        brokenNFTs.push(id);
      }

    if (brokenNFTs.length)
      this.logger.error(
        `Transfer failed \x1b[33m${fromUserEmail}\x1b[31m -> \x1b[33m${toUserEmail}\x1b[31m, broken NFTs:\x1b[0m ${brokenNFTs.join(
          ',',
        )}`,
      );

    return new SuccessResponse({ brokenNFTs }, !brokenNFTs.length);
  }
}
