import { IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class TransactionsDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('test')
  transaction: string;
}
