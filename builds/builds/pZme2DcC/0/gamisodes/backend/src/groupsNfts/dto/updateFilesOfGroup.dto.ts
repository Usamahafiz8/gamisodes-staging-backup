import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class UpdateFilesOfGroupDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ApiExpose('test-1111-2222-3333', { required: true, isArray: true })
  filesIds: string[];
}

export class GetModelOfGroupId {
  @IsUUID('4')
  @ApiExpose('test-1111-2222-3333')
  modelOfGroupId: string;
}
