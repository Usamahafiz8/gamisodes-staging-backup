import { IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class GetGroupDto {
  @IsUUID('4')
  @ApiExpose('test-1111-2222-3333')
  groupId: string;
}
