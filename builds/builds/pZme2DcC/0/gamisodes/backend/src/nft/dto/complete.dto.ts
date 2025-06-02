import { IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class CompleteCheckoutDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('test-test-test-test')
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  @ApiExpose('test-test-test-test')
  nftDatabaseId: string;
}
