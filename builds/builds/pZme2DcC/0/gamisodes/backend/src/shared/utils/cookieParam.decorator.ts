import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';

export const Cookies = <T extends object>(
  classConstructor: ClassConstructor<T>,
  options?: ClassTransformOptions,
) =>
  createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!classConstructor) return request.cookies;

    const validationSchema = plainToInstance(
      classConstructor,
      request.cookies,
      options,
    );
    const errorsData = await validate(validationSchema, {
      skipMissingProperties: false,
      groups: options?.groups,
    });

    if (errorsData.length > 0)
      throw new BadRequestException(
        Object.values(errorsData?.[0]?.constraints),
      );

    return request.cookies;
  })();
