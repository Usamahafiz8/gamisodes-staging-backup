import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class AddressParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('0x1234')
  address: string;
}
