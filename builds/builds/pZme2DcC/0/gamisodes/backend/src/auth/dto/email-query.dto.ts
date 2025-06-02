import { IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class EmailQueryDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('email@gmail.com')
  email: string;
}
