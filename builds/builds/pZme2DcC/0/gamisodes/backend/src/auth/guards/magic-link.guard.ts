import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MagicLinkGuard extends AuthGuard('magic-link') {}

export const AuthMagicLink = () => UseGuards(MagicLinkGuard);
