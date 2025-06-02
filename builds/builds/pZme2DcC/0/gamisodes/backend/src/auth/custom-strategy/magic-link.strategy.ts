import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { createTransport, Transporter } from 'nodemailer';
import { Strategy } from 'passport';
import { ParsedQs } from 'qs';
import {
  IAuthTokenPayload,
  IInfoPayload,
  IUserPayload,
  MessagesEnum,
} from 'src/shared/types';
import { defaultHTML } from './emails';

declare global {
  namespace Express {
    interface User extends IUserPayload {}
  }
}

export interface IMailParams {
  subject: string;
  html: string;
  text: string;
}

interface IMagicLinkOptions {
  pass: string;
  from: string;
  urlSmtp?: string;
  domain?: string;

  redirectUrl: string;

  secretOrKey: string;

  paramAccessKey?: string;

  messageParams?: (
    req?: Request,
    url?: string,
  ) => Promise<IMailParams> | IMailParams | void;
}

export class MagicLinkStrategy extends Strategy {
  private opt: IMagicLinkOptions;
  private client: Transporter;
  private readonly jwtService: JwtService;

  constructor(opt: IMagicLinkOptions) {
    super();
    this.opt = opt;
    this.client = createTransport({
      host: opt.urlSmtp,
      port: 465,
      auth: {
        user: opt.from,
        pass: opt.pass,
      },
    });

    this.jwtService = new JwtService({ secret: opt.secretOrKey });
  }

  name: string;

  async authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any,
  ): Promise<void> {
    const token = req.query?.[this.opt.paramAccessKey || 'authToken'];
    const email = req.body?.email;

    if (!token && email) {
      const token = await this.jwtService.signAsync({ email });
      const url = new URL(this.opt.redirectUrl);
      if (
        typeof req.query?.redirectUrl === 'string' &&
        req.query?.redirectUrl.includes('localhost')
      )
        url.host = new URL(req.query?.redirectUrl).host;
      url.searchParams.set(this.opt.paramAccessKey || 'authToken', token);
      if (req.query)
        Object.entries(req.query).forEach(([key, value]) =>
          url.searchParams.set(key, value.toString()),
        );

      await this.client.sendMail({
        from: this.opt.from,
        to: email,
        ...((await this.opt.messageParams(req, url.toString())) || {
          subject: `Sign in to ${this.opt.domain}`,
          html: defaultHTML({ host: this.opt.domain, url: url.toString() }),
          text: defaultHTML({ host: this.opt.domain, url: url.toString() }),
        }),
      });

      req.res.status(200).send({ message: MessagesEnum.CHECK_YOUR_EMAIL });
      return;
    }

    if (typeof token === 'string') {
      const payload = await this.jwtService
        .verifyAsync(token)
        .catch(() => this.fail('Token not valid'));
      const vPayload = await this.validate(payload, { token });
      if (vPayload) return this.success(vPayload);
      return this.fail('Validate fail', 401);
    }
  }

  async validate(
    payload: IAuthTokenPayload,
    info?: IInfoPayload,
  ): Promise<IUserPayload> {
    throw new Error('Method not implement');
  }
}
