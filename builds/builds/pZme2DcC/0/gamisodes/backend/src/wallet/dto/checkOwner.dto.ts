import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorsEnum } from 'src/shared/types';
import { ApiExpose } from 'src/shared/utils';

export class CheckWalletOwnerDto {
  @IsString({ message: ErrorsEnum.MustBeString })
  @IsNotEmpty({ message: ErrorsEnum.IsNotEmpty })
  @ApiExpose('loggedWithAddress')
  loggedWithAddress: string;
}
