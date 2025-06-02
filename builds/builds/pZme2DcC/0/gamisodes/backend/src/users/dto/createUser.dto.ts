import { IsEmail } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class CreateUserDto {
  @IsEmail()
  @ApiExpose()
  email: string;
}
