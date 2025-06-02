import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorsEnum } from 'src/shared/types';
import { ApiExpose } from 'src/shared/utils';

export class CurrentUserCookieDto {
  @IsString({ message: ErrorsEnum.MustBeString })
  @IsNotEmpty({ message: ErrorsEnum.IsNotEmpty })
  @ApiExpose('CURRENT_USER')
  CURRENT_USER: string;
}
