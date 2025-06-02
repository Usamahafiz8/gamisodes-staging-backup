import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin-token.guard';
import { ErrorsEnum, IUserPayload } from 'src/shared/types';
import {
  ApiErrorResponse,
  ApiInternalErrorResponse,
  ApiSuccessResponse,
  ApiUnauthorizedResponse,
  SuccessResponse,
  User,
} from 'src/shared/utils';
import { UsersService } from './users.service';
import { Auth0Jwt } from 'src/auth/guards';
import { CreateUserDto, NewUserDto } from './dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // For admin
  @Post('/')
  @AdminGuard()
  async walletUserList() {
    const data = await this.userService.walletUserList();
    return new SuccessResponse(data, !!data?.length);
  }

  // For admin
  @Post('/createUser')
  @AdminGuard()
  @ApiExcludeEndpoint()
  async createUser(@Body() { email }: CreateUserDto) {
    return await this.userService.create({ email }, true);
  }

  // For admin
  @Get('/statistics')
  @AdminGuard()
  @ApiExcludeEndpoint()
  async statistics() {
    return await this.userService.statistics();
  }

  // For admin
  @Get('/:email')
  @AdminGuard()
  @ApiExcludeEndpoint()
  async user(@Param() { email }: CreateUserDto) {
    return await this.userService.getOneForAdmin(email);
  }

  // For Rarible
  @Post('/new-user')
  @Auth0Jwt()
  @ApiOperation({
    summary: 'Webhook for marketplace',
  })
  @ApiSuccessResponse()
  @ApiInternalErrorResponse()
  @ApiErrorResponse(400, [
    // ErrorsEnum.VerifySignatureFailed, // For Rarible check signature. For feature.
    ErrorsEnum.WalletNotFound,
    ErrorsEnum.VerifySubjectFailed,
  ])
  @ApiUnauthorizedResponse()
  async newUser(@User() user: IUserPayload, @Body() body: NewUserDto) {
    return this.userService.setUserWithMagicWallet(body);
  }
}
