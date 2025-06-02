import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { GetConfigService } from 'src/config/config.service';
import { NiftoryApiService } from 'src/niftory-api/niftory-api.service';
import {
  AuthProviderEnum,
  AuthTypeEnum,
  IAuthTokenPayload,
  IInfoPayload,
  IUserPayload,
} from 'src/shared/types';
import { promoNftHtml, promoNftText } from '../custom-strategy/emails';
import { MagicLinkStrategy as Strategy } from '../custom-strategy/magic-link.strategy';

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(
  Strategy,
  'magic-link',
) {
  constructor(
    private readonly configService: GetConfigService,
    private readonly nService: NiftoryApiService,
  ) {
    super({
      pass: configService.safeGet('EMAIL_AUTHOR_PASS'),
      domain: configService.safeGet('FRONT_HOST'),
      from: configService.safeGet('EMAIL'),
      urlSmtp: 'smtp.gmail.com',

      redirectUrl: configService.safeGet('MAGICLINK_REDIRECT_URL'),

      secretOrKey: configService.safeGet('ACCESS_TOKEN_SECRET_KEY'),

      messageParams: async (req: Request, url: string) => {
        if (typeof req.query?.['nftModelId'] !== 'string') return;
        const nftModel = await nService.nftModelById(req.query['nftModelId']);
        return {
          subject: `Sign in to ${configService.safeGet('FRONT_HOST')}`,
          html: promoNftHtml({ url, nftModel }),
          text: promoNftText({
            host: configService.safeGet('FRONT_HOST'),
            url,
          }),
        };
      },
    });
  }

  async validate(
    payload: IAuthTokenPayload,
    info: IInfoPayload,
  ): Promise<IUserPayload> {
    const userPayload: IUserPayload = {
      email: payload.email,
      provider: AuthProviderEnum.App,
      type: AuthTypeEnum.MagicLink,
      accessToken: info.token,
    };
    return userPayload;
  }
}
