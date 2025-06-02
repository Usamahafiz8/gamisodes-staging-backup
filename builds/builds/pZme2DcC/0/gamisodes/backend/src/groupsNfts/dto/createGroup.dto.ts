import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { GroupTypeEnum } from 'src/db/entity';
import { ApiExpose } from 'src/shared/utils';
import { ToModelData } from 'src/shared/utils/toModelData.decorator';

export class ModelDataDto {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiExpose('test-1111-2222-3333')
  modelId: string;

  @IsUUID('4')
  @IsOptional()
  @ApiExpose('test-1111-2222-3333')
  packagingModelId: string;
}

export class CreateGroupDto {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiExpose('test-1111-2222-3333')
  cardFaceModelId: string;

  @IsEnum(GroupTypeEnum)
  @IsNotEmpty()
  @ApiExpose(GroupTypeEnum.Wrapper)
  type: GroupTypeEnum;

  @IsUUID('4')
  @IsOptional()
  @ApiExpose('test-1111-2222-3333')
  anotherVersionId: string;

  @IsDate()
  @IsOptional()
  @ApiExpose(new Date())
  unpackagingDate?: Date;
}
