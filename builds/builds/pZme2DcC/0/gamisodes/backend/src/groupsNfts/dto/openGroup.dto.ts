import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';
import { GetGroupDto } from './getGroup.dto';

export class OpenGroupDto extends GetGroupDto {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiExpose('test-1111-2222-3333', { required: true })
  niftoryId: string;
}
