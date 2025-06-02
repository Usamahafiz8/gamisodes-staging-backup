import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Auth0Jwt } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin-token.guard';
import { User as IUser } from 'src/db/entity';
import { ShouldLogoutResponse, SuccessResponse, User } from 'src/shared/utils';
import { Cookies } from 'src/shared/utils/cookieParam.decorator';
import {
  AddressParamDto,
  CheckWalletOwnerDto,
  CurrentUserCookieDto,
  MergeWalletsDto,
  TransactionsDto,
  VerifyWalletDto,
} from './dto';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // For admin
  @Post('/mergeWallets')
  @AdminGuard()
  @ApiExcludeEndpoint()
  async mergeWallets(@Body() { fromUser, toUser, nftId }: MergeWalletsDto) {
    console.log({ fromUser, toUser, nftId });

    return await this.walletService.mergeWallets(fromUser, toUser, nftId);
  }

  @Post('/verify')
  async verifyWallet(
    @Cookies(CurrentUserCookieDto) { CURRENT_USER }: CurrentUserCookieDto,
    @Body() { signedVerificationCode }: VerifyWalletDto,
  ) {
    const data = await this.walletService.verifyWallet(
      JSON.parse(CURRENT_USER)?.addr,
      signedVerificationCode,
    );
    return new SuccessResponse(data);
  }

  @Post('/ready')
  async readyWallet(
    @Cookies(CurrentUserCookieDto) { CURRENT_USER }: CurrentUserCookieDto,
  ) {
    const data = await this.walletService.readyWallet(
      JSON.parse(CURRENT_USER)?.addr,
    );
    return new SuccessResponse(data);
  }

  @Post('/register')
  @Auth0Jwt()
  async registerWallet(
    @Cookies(CurrentUserCookieDto) { CURRENT_USER }: CurrentUserCookieDto,
    @User() user: IUser,
  ) {
    const data = await this.walletService.registerWallet(
      user,
      JSON.parse(CURRENT_USER)?.addr,
    );
    return new SuccessResponse(data);
  }

  @Post('/checkOwner')
  @Auth0Jwt()
  async checkWalletOwner(
    @Body() { loggedWithAddress }: CheckWalletOwnerDto,
    @User() { email: ourEmail }: IUser,
  ) {
    const flag = await this.walletService.checkWalletOwner(
      ourEmail,
      loggedWithAddress,
    );
    return new ShouldLogoutResponse(flag);
  }

  @Post('/signTransaction')
  @Auth0Jwt()
  async signTransaction(
    @Body() { transaction }: TransactionsDto,
    @Cookies(CurrentUserCookieDto) { CURRENT_USER }: CurrentUserCookieDto,
  ) {
    const flag = await this.walletService.signTransaction(transaction);
    return new SuccessResponse(flag, !!flag);
  }

  @Post('/:address')
  @AdminGuard()
  async wallet(@Param() { address }: AddressParamDto) {
    const data = await this.walletService.getWallet(address);
    return new SuccessResponse(data, !!data);
  }

  @Post('/:address/disconnect')
  @AdminGuard()
  async walletDisconnect(@Param() { address }: AddressParamDto) {
    const data = await this.walletService.walletDisconnect(address);
    return new SuccessResponse(data, !!data);
  }
}
