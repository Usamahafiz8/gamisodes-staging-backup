import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ErrorsEnum } from 'src/shared/types';
import { ApiExpose } from 'src/shared/utils';

export class SignedVerificationCodeDto {
  @ApiExpose('')
  @IsNotEmpty()
  f_type: string;
  @ApiExpose('')
  @IsNotEmpty()
  f_vsn: string;
  @ApiExpose('')
  @IsNotEmpty()
  signature: string;
  @ApiExpose('')
  @IsNotEmpty()
  addr: string;
  @ApiExpose(0)
  @IsNotEmpty()
  keyId: number;
}

export class VerifyWalletDto {
  @IsNotEmpty({ message: ErrorsEnum.IsNotEmpty })
  @ApiExpose(new SignedVerificationCodeDto(), {
    type: SignedVerificationCodeDto,
    isArray: true,
  })
  @Type(() => SignedVerificationCodeDto)
  @ValidateNested({ each: true })
  signedVerificationCode: SignedVerificationCodeDto[];
}
