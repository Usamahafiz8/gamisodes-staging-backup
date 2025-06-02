import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export const MyApiProperty = (example?: any, options?: ApiPropertyOptions) =>
  ApiProperty({ ...options, example });

export function ApiExpose();
export function ApiExpose(options?: ApiPropertyOptions);
export function ApiExpose(example?: any, options?: ApiPropertyOptions);
export function ApiExpose(
  example: any = 'string',
  options?: ApiPropertyOptions,
) {
  if (typeof example === 'object' && !options)
    return applyDecorators(Expose(), MyApiProperty(undefined, example));
  return applyDecorators(Expose(), MyApiProperty(example, options));
}
