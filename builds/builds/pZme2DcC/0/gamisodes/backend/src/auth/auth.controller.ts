import { Controller, Get, Header, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as Users } from 'src/db/entity';
import { SuccessResponse, User } from 'src/shared/utils';
import { AuthService } from './auth.service';
import { EmailQueryDto } from './dto/email-query.dto';
import { Auth0Jwt } from './guards';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @Auth0Jwt()
  async me(@User() user: Users) {
    return await this.authService.me(user.id);
  }

  @Post('/email')
  async email(@Query() { email }: EmailQueryDto) {
    return new SuccessResponse(await this.authService.email(email));
  }
}
