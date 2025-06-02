import { Injectable, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class Auth0JwtGuard extends AuthGuard('auth0jwt') {}

export const Auth0Jwt = () =>
  applyDecorators(UseGuards(Auth0JwtGuard), ApiBearerAuth());
