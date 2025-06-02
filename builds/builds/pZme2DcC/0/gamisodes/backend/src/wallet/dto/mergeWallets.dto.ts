import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class MergeWalletsDto {
  @IsEmail()
  @ApiExpose()
  fromUser: string;

  @IsEmail()
  @ApiExpose()
  toUser: string;

  @IsUUID('4')
  @IsOptional()
  @ApiExpose()
  nftId?: string;
}
