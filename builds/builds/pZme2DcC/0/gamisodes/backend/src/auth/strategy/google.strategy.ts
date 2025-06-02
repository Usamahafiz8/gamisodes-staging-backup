import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GetConfigService } from 'src/config/config.service';
import { AuthProviderEnum, AuthTypeEnum, IUserPayload } from 'src/shared/types';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: GetConfigService) {
    super({
      clientID: configService.safeGet('GOOGLE_CLIENT_ID'),
      clientSecret: configService.safeGet('GOOGLE_CLIENT_SECRET'),
      scope: configService.safeGet('GOOGLE_SCOPES'),
      callbackURL: configService.safeGet('GOOGLE_REDIRECT_URL'),
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;

    if (req.cookies?.['google-params'])
      req.query = req.cookies?.['google-params'];

    const user: IUserPayload = {
      email: emails[0].value as string,
      name: `${name.familyName}${name.givenName ? ' ' + name.givenName : ''}`,
      image: photos[0].value,
      accessToken,
      refreshToken,
      provider: AuthProviderEnum.Google,
      type: AuthTypeEnum.Oauth,
      providerAccountId: id,
    };
    done(null, user);
  }
}
