import { IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class NftModelParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('test-1111-2222-3333', {
    description: 'NftModelId is nftId from wallet',
  })
  nftModelId: string;
}
