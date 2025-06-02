import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class DeleteFileParamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiExpose('test-1111-2222-3333')
  id: string;
}
