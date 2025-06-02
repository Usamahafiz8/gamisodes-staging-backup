import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { GetConfigService } from 'src/config/config.service';
import { Account, Session } from 'src/db/entity';
import { AuthProviderEnum, IUserPayload } from 'src/shared/types';
import { UsersService } from 'src/users/users.service';
import { DeepPartial, FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { ITokens } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ISessionPayload } from 'src/shared/types/session-jwt.i';
import { WalletService } from 'src/wallet/wallet.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  @InjectRepository(Account)
  private readonly AccountRepo: Repository<Account>;
  @InjectRepository(Session)
  private readonly SessionRepo: Repository<Session>;

  private readonly refreshSignOptions: JwtSignOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
    private readonly walletService: WalletService,
    private readonly configService: GetConfigService,
  ) {
    this.refreshSignOptions = {
      secret: configService.safeGet('REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: configService.safeGet('TIME_OF_REFRESH_KEY'),
    };
  }

  async tokens(payload: ISessionPayload): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshSignOptions,
    );
    return { accessToken, refreshToken };
  }

  async saveSession(sessionData: DeepPartial<Session>): Promise<Session> {
    const session = this.SessionRepo.create(sessionData);
    await this.deleteExpiredSession();
    if (sessionData.id) return await this.SessionRepo.save(session);
    return (
      await this.SessionRepo.createQueryBuilder()
        .insert()
        .values(session)
        .returning('*')
        .execute()
    )?.raw[0];
  }

  async deleteExpiredSession() {
    return await this.SessionRepo.delete({ expires: LessThan(new Date()) });
  }

  async saveAccount(accountData: DeepPartial<Account>) {
    const account = this.AccountRepo.create(accountData);
    if (accountData.id) return await this.AccountRepo.save(account);
    return (
      await this.AccountRepo.createQueryBuilder()
        .insert()
        .values(account)
        .returning('*')
        .execute()
    )?.raw[0];
  }

  async deleteExpiredAccount(where: FindOptionsWhere<Account>) {
    return await this.AccountRepo.delete(where);
  }

  async getAccount(provider: AuthProviderEnum, providerAccountId: string) {
    return await this.AccountRepo.findOneBy({ provider, providerAccountId });
  }

  async getAccountByToken(idToken: string) {
    return await this.AccountRepo.findOneBy({ idToken });
  }

  async me(userId: string) {
    return await this.userService.getOne(userId, {
      wallet: true,
      custodialWallet: true,
      magicWallet: true,
    });
  }

  async login(userPayload: IUserPayload) {
    let user = await this.userService.getOne(
      { email: userPayload.email.toLocaleLowerCase() },
      { wallet: true, custodialWallet: true },
    );
    if (!user)
      user = await this.userService.create({
        email: userPayload.email.toLocaleLowerCase(),
        name: userPayload.name,
        emailVerified: new Date(),
        image: userPayload.image,
      });
    else
      await this.userService.save({
        id: user.id,
        name: userPayload.name,
        image: userPayload.image,
        emailVerified: new Date(),
      });

    if (!user.custodialWallet)
      user.custodialWallet = await this.walletService.createCustodialWallet(
        user.email,
      );

    const providerAccountId = userPayload.providerAccountId || user.id;

    const session = await this.saveSession({
      userId: user.id,
      expires: moment().add(this.configService.safeGet('TIME_OF_ACCESS_KEY')),
      sessionToken: uuidv4(),
    });

    const { accessToken, refreshToken } = await this.tokens({
      userId: user.id,
      email: user.email,
      sessionToken: session.sessionToken,
      provider: userPayload.provider,
      providerAccountId,
    });

    const account = await this.getAccount(
      userPayload.provider,
      providerAccountId,
    );
    await this.saveAccount({
      id: account?.id,
      userId: user.id,
      ...userPayload,
      providerAccountId,
      tokenType: 'Cookies',
      idToken: accessToken,
    });
    return { accessToken, refreshToken, user };
  }

  async verifyRefresh(refreshToken: string): Promise<ISessionPayload> {
    const { iat, exp, ...payload } = await this.jwtService.verifyAsync(
      refreshToken,
      this.refreshSignOptions,
    );
    return payload;
  }

  async refresh(payload: ISessionPayload) {
    const { accessToken, refreshToken } = await this.tokens(payload);

    const account = await this.getAccount(
      payload.provider,
      payload.providerAccountId,
    );
    await this.saveAccount({
      id: account?.id,
      idToken: accessToken,
    });

    return { accessToken, refreshToken };
  }

  async email(email: string) {
    const body = {
      g: 'Wugani',
      $fields: '$first_name, $parent ,$source',
      email: email ?? '',
      $first_name: '',
      $parrent: '',
      $source: 'Sign up form',
    };
    const newData = new URLSearchParams(body);
    const data = (
      await this.httpService.axiosRef.post(
        this.configService.safeGet('PUBLIC_KLAVIYO_URL') ?? '',
        newData,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
          },
        },
      )
    )?.data;
    return data;
  }
}
