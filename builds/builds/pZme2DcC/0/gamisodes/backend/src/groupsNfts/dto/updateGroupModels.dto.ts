import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class UpdateGroupModels {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiExpose('test-1111-2222-3333', { required: true })
  modelId: string;

  @IsUUID('4')
  @IsOptional()
  @ApiExpose('test-1111-2222-3333')
  packagingModelId: string;
}
