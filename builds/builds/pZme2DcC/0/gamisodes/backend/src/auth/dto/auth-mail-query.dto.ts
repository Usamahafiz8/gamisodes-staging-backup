import { IsOptional, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class AuthMailQueryDto {
  @IsString()
  @IsOptional()
  @ApiExpose('', { required: false })
  nftModelId: string;

  @IsString()
  @IsOptional()
  @ApiExpose('', { required: false })
  redirectUrl: string;
}
