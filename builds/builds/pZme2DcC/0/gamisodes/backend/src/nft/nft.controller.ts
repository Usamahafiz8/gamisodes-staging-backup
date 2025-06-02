import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Auth0Jwt } from 'src/auth/guards';
import { ErrorsEnum, IUserPayload } from 'src/shared/types';
import {
  ApiErrorResponse,
  ApiInternalErrorResponse,
  ApiSuccessResponse,
  Cookies,
  SuccessResponse,
  User,
} from 'src/shared/utils';
import { CurrentUserCookieDto } from 'src/wallet/dto';
import {
  CompleteCheckoutDto,
  MarketplaceTransferDto,
  NftModelParamDto,
} from './dto';
import { NftService } from './nft.service';

@Controller('nft')
@ApiTags('NFT')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('/:nftModelId/completeCheckout')
  @Auth0Jwt()
  async completeCheckout(
    @Cookies(CurrentUserCookieDto) { CURRENT_USER }: CurrentUserCookieDto,
    @Body() { nftDatabaseId, transactionId }: CompleteCheckoutDto,
    @Param() param: NftModelParamDto,
  ) {
    const data = await this.nftService.nftModelCompleteCheckout(
      transactionId,
      nftDatabaseId,
    );
    return new SuccessResponse(data);
  }

  @Post('/:nftModelId/initiateCheckout')
  @Auth0Jwt()
  async initiateCheckout(
    @Param() { nftModelId }: NftModelParamDto,
    @User() { id: userId }: IUserPayload,
  ) {
    const data = await this.nftService.nftModelInitCheckout(userId, nftModelId);
    return new SuccessResponse(data);
  }

  @Post('/:nftModelId/transferToDapper')
  @Auth0Jwt()
  async transferToDapper(
    @Param() { nftModelId }: NftModelParamDto,
    @User() { id }: IUserPayload,
  ) {
    const data = await this.nftService.transferToDapper(nftModelId, id);
    return data;
  }

  // For Rarible
  @Post('/transfer-between-users')
  @ApiOperation({
    summary: 'Webhook for marketplace',
  })
  @Auth0Jwt()
  @ApiSuccessResponse()
  @ApiInternalErrorResponse()
  @ApiErrorResponse(400, [ErrorsEnum.NftNotExist, ErrorsEnum.UserNotExist])
  async newUser(@Body() body: MarketplaceTransferDto) {
    return this.nftService.transferToUserInDb(body);
  }
}
