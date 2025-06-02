import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GetConfigService } from 'src/config/config.service';
import { ErrorsEnum } from 'src/shared/types';

export interface IReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

export class ReCapthchaGuard implements CanActivate {
  @Inject(GetConfigService)
  private readonly configService: GetConfigService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = new HttpService();
    const req = context.switchToHttp().getRequest<Request>();

    if (req.query?.['authToken']) return true;

    const reCapthchaToken = req.body?.['g-recaptcha'];
    const secret = this.configService.safeGet('RECAPTCHA_TOKEN');
    const res: IReCaptchaResponse = (
      await http.axiosRef.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reCapthchaToken}`,
      )
    ).data;
    if (!res.success) throw new HttpException(ErrorsEnum.RecaptchaError, 403);
    return res.success;
  }
}

export const ReCaptcha = () => UseGuards(ReCapthchaGuard);
