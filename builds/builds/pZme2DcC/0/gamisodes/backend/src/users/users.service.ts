import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetConfigService } from 'src/config/config.service';
import { CustodialWallet, MagicWallet, User, UserAuth0 } from 'src/db/entity';
import { NiftoryApiService } from 'src/niftory-api/niftory-api.service';
import { ErrorsEnum, MessagesEnum } from 'src/shared/types';
import { SuccessResponse } from 'src/shared/utils';
import { magicVerifySub } from 'src/shared/utils/magicVerifySub.utils';
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { NewUserDto } from './dto/newUser.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly UserRepo: Repository<User>;
  @InjectRepository(UserAuth0)
  private readonly UserAuth0Repo: Repository<UserAuth0>;
  @InjectRepository(MagicWallet)
  private readonly magicWalletRepo: Repository<MagicWallet>;
  @InjectRepository(CustodialWallet)
  private readonly custodialWalletRepo: Repository<CustodialWallet>;

  private readonly logger: Logger = new Logger('UsersService');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: GetConfigService,
    private readonly nService: NiftoryApiService,
  ) {}

  async create(
    userData: DeepPartial<User>,
    createWallet?: boolean,
    recreate?: boolean,
  ): Promise<User> {
    userData.email = userData.email?.toLowerCase();
    const userExist = await this.getOne(
      { email: userData.email },
      { custodialWallet: true },
    );
    if (userExist && !recreate) return userExist;
    const user = this.UserRepo.create(userData);
    const resUser = (
      await this.UserRepo.createQueryBuilder()
        .insert()
        .values(user)
        .orIgnore()
        .returning('*')
        .execute()
    )?.raw[0] as User;
    if (!createWallet) return resUser;
    const {
      createNiftoryWallet: { id: niftoryWalletId },
    } = await this.nService.createCustodialWallet();
    resUser.custodialWallet = await this.custodialWalletRepo.save({
      userEmail: userData.email,
      niftoryWalletId,
    });
    return resUser;
  }

  async auth0Relations(userId: string, auth0Id: string) {
    return await this.UserAuth0Repo.save({ auth0Id, userId });
  }

  async getOne(
    userData: string,
    relations?: FindOptionsRelations<User>,
  ): Promise<User>;
  async getOne(
    userData: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ): Promise<User>;
  async getOne(
    userData: FindOptionsWhere<User> | string,
    relations?: FindOptionsRelations<User>,
  ): Promise<User> {
    if (typeof userData === 'string') userData = { id: userData };
    return await this.UserRepo.findOne({ where: userData, relations });
  }

  async getOneForAdmin(email: string): Promise<User> {
    const user = await this.getOne(
      { email },
      { custodialWallet: true, magicWallet: true, wallet: true },
    );
    const { walletById } = await this.nService.walletById(
      user.custodialWallet.niftoryWalletId,
    );
    user.custodialWallet['address'] = walletById?.address;
    return user;
  }

  async save(userData: DeepPartial<User>): Promise<User> {
    const user = this.UserRepo.create(userData);
    return await this.UserRepo.save(user);
  }

  async getMany(
    where: FindOptionsWhere<User>[] | FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ): Promise<User[]> {
    return await this.UserRepo.find({ where, relations });
  }

  async walletUserList() {
    return await this.getMany(
      [
        { wallet: { id: Not(IsNull()) } },
        { custodialWallet: { id: Not(IsNull()) } },
      ],
      { wallet: true, custodialWallet: true },
    );
  }

  async setUserWithMagicWallet({
    email,
    wallet,
    // signature, // Rarible side field. For feature.
    // publicKey, // Rarible side field. For feature.
    sub,
  }: NewUserDto) {
    email = email.toLowerCase();

    const magicVerify = await magicVerifySub(this.httpService.axiosRef, {
      type: 'subject',
      value: sub,
    }).catch((err) => {
      throw new BadRequestException(ErrorsEnum.VerifySubjectFailed);
    });
    if (
      !magicVerify?.data?.wallets?.some(
        ({ public_address, wallet_type }) =>
          public_address === wallet && wallet_type === 'FLOW',
      )
    )
      throw new BadRequestException(ErrorsEnum.WalletNotFound);

    // Rarible signature check. For feature.
    //
    // const verf = await rarribleVerifySign(this.httpService.axiosRef, {
    //   message: `I want to transfer assets of ${email} to wallet ${walletAddress} on trade.gamisodes.com`,
    //   signature,
    //   publicKey,
    //   signer: `FLOW:${walletAddress}`,
    // }).catch((err) => {
    //   throw new BadRequestException(ErrorsEnum.VerifySignatureFailed);
    // });
    // if (!verf) throw new BadRequestException(ErrorsEnum.VerifySignatureFailed);

    const user = await this.create({ email }, true);
    await this.auth0Relations(user.id, sub);
    await this.magicWalletRepo.save(
      this.magicWalletRepo.create({
        address: wallet,
        userEmail: email,
      }),
    );
    const nfts = await this.nService.nftsOfWallets(
      user.custodialWallet.niftoryWalletId,
    );
    await this.nService.registerWallet(wallet);
    const { walletById } = await this.nService.walletById(
      user.custodialWallet.niftoryWalletId,
    );
    const brokenNFTs = [];
    for (const { modelId, id } of nfts) {
      if (this.configService.safeGet('WRAPPERS_IDS').includes(modelId))
        continue;
      await this.nService
        .transferBetweenWallets(id, wallet, walletById.address)
        .catch(() => brokenNFTs.push(id));
    }
    if (brokenNFTs.length)
      this.logger.error(
        `Not all NFTs of \x1b[31m${email}\x1b[0m transferred:\n ${brokenNFTs.join(
          ', ',
        )}`,
      );
    return new SuccessResponse(MessagesEnum.SUCCESSFUL);
  }

  async statistics() {
    const year = new Date();
    year.setFullYear(year.getFullYear() - 1);
    const halfYear = new Date();
    halfYear.setMonth(halfYear.getMonth() - 6);
    const month = new Date();
    month.setMonth(month.getMonth() - 1);
    const week = new Date();
    week.setDate(week.getDate() - 7);
    const threeDays = new Date();
    threeDays.setDate(threeDays.getDate() - 3);
    const twoDays = new Date();
    twoDays.setDate(twoDays.getDate() - 2);
    const day = new Date();
    day.setDate(day.getDate() - 1);

    const usersAllTime = await this.UserRepo.count();
    const usersYear = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(year) },
    });
    const usersHalfYear = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(halfYear) },
    });
    const usersMonth = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(month) },
    });
    const usersWeek = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(week) },
    });
    const usersThreeDays = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(threeDays) },
    });
    const userTwoDays = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(twoDays) },
    });
    const userDays = await this.UserRepo.count({
      where: { emailVerified: MoreThanOrEqual(day) },
    });
    return new SuccessResponse({
      usersAllTime,
      usersYear,
      usersHalfYear,
      usersMonth,
      usersWeek,
      usersThreeDays,
      userTwoDays,
      userDays,
    });
  }
}
