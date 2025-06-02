import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GetConfigService } from 'src/config/config.service';
import { ErrorsEnum } from 'src/shared/types';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly configService: GetConfigService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const adminHeader =
      (req.headers['x-gamisodes-admin-key'] ||
        req.headers['X-Gamisodes-Admin-Key']) ??
      '';
    if (adminHeader != this.configService.safeGet('ADMIN_SECRET'))
      throw new HttpException(
        { statusCode: 405, message: [ErrorsEnum.MethodNotAllowed] },
        405,
      );
    return true;
  }
}

export const AdminGuard = () => UseGuards(AdminAuthGuard);
