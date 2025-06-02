import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetConfigService } from 'src/config/config.service';
import { Session, User } from 'src/db/entity';
import { ErrorsEnum } from 'src/shared/types';
import { ISessionPayload } from 'src/shared/types/session-jwt.i';
import { UsersService } from 'src/users/users.service';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @InjectRepository(Session)
  private readonly SessionRepo: Repository<Session>;

  constructor(
    private readonly configService: GetConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const access = req.cookies?.['Access'];
        if (access) return access;

        const refresh = req.cookies?.['Refresh'];
        if (!refresh) return null;

        req.res.cookie('RefererPath', req.path);
        req.res.redirect(307, '/server/auth/refresh');
      },
      ignoreExpiration: false,
      secretOrKey: configService.safeGet('ACCESS_TOKEN_SECRET_KEY'),
    });
  }

  async validate({
    sessionToken,
    userId,
  }: ISessionPayload): Promise<User | void> {
    const session = this.SessionRepo.findOneBy({
      sessionToken,
      expires: MoreThan(new Date()),
    });
    if (!session) return this.fail(ErrorsEnum.SessionExpired, 401);
    return await this.userService.getOne(userId);
  }
}
