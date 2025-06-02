import { IsNumber, IsOptional } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @ApiExpose(10, { required: false })
  skip: number;

  @IsNumber()
  @IsOptional()
  @ApiExpose(15, { required: false })
  take: number;
}
