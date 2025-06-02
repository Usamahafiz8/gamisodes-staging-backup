import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetConfigService } from 'src/config/config.service';
import { User } from 'src/db/entity';
import { UsersService } from 'src/users/users.service';
import { WalletService } from 'src/wallet/wallet.service';

export interface IAuth0Payload {
  iss: string;
  sub: string;
  aud: string[];
  azp: string;
  scope: string;
}

interface IAuth0User {
  created_at: Date;
  email: string;
  email_verified: boolean;
  identities: [
    {
      connection: string;
      provider: string;
      user_id: string;
      isSocial: false;
    },
  ];
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date;
  user_id: string;
  last_ip: string;
  last_login: Date;
  logins_count: number;
}

@Injectable()
export class Auth0JwtStrategy extends PassportStrategy(Strategy, 'auth0jwt') {
  constructor(
    private readonly configService: GetConfigService,
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
    private readonly walletService: WalletService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.safeGet('AUTH0_AUDIENCE'),
      issuer: configService.safeGet('AUTH0_ISSUER_URL'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.safeGet(
          'AUTH0_ISSUER_URL',
        )}.well-known/jwks.json`,
      }),
    });
  }

  async validate(payload: IAuth0Payload): Promise<User | void> {
    let user = await this.userService.getOne(
      { auth0Ids: { auth0Id: payload.sub } },
      { auth0Ids: true, custodialWallet: true },
    );
    if (user) return user;

    const token = (
      await this.httpService.axiosRef.post(
        `${this.configService.safeGet('AUTH0_ISSUER_URL')}oauth/token`,
        {
          grant_type: 'client_credentials',
          client_id: this.configService.safeGet('AUTH0_CLIENT_ID'),
          client_secret: this.configService.safeGet('AUTH0_CLIENT_SECRET'),
          audience: `${this.configService.safeGet('AUTH0_ISSUER_URL')}api/v2/`,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
    )?.data?.access_token;
    const { email, name, picture }: IAuth0User = (
      await this.httpService.axiosRef.get(
        `${this.configService.safeGet('AUTH0_ISSUER_URL')}api/v2/users/${
          payload.sub
        }`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
    )?.data;

    user = await this.userService.create({ email, name, image: picture });
    await this.userService.auth0Relations(user.id, payload.sub);
    if (!user.custodialWallet)
      user.custodialWallet = await this.walletService.createCustodialWallet(
        user.email,
      );
    return user;
  }
}
