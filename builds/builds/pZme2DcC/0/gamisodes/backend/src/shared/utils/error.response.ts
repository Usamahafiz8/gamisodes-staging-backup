import { ApiResponse } from '@nestjs/swagger';
import { ErrorsEnum } from '../types';
import { ApiExpose } from './apiExpose.decorator';

export class ErrorResponse {
  @ApiExpose(400)
  statusCode: number = 400;
  @ApiExpose(ErrorsEnum.SomethingWentWrong)
  message: string | string[] = ErrorsEnum.SomethingWentWrong;
  @ApiExpose({ required: false })
  error?: string;
}

export class UnauthorizedResponse {
  @ApiExpose(401)
  statusCode: number = 401;
  @ApiExpose('Unauthorized')
  message: string | string[] = 'Unauthorized';
}

export class InternalErrorResponse {
  @ApiExpose(500)
  statusCode: number = 500;
  @ApiExpose('Internal server error')
  message: string = 'Internal server error';
}

const customErrorRes = (
  statusCode: number = 400,
  message?: string | string[],
  error?: string,
) => {
  class CustomErrorRes extends ErrorResponse {
    @ApiExpose(statusCode)
    statusCode: number = 400;
    @ApiExpose(message, { enum: statusCode < 500 ? ErrorsEnum : undefined })
    message: string | string[] = message;
    @ApiExpose(error, { required: false })
    error?: string = '';
  }
  return CustomErrorRes;
};

export function ApiErrorResponse(
  statusCode: number = 400,
  message?: string | string[],
  error: string = 'Bad Request',
) {
  // const c = customErrorRes(statusCode, message, error);
  // const d = class {};
  // console.log(c);
  // console.log(d);
  // console.log(Reflect.getMetadataKeys(new c()));
  // console.log(Reflect.getMetadataKeys(new c(), 'message'));
  // console.log(Reflect.getMetadata('design:type', new c(), 'message'));
  // const cl = copySwaggerMetadata(c, d);
  // console.log(
  //   Reflect.getMetadata(
  //     'swagger/apiModelProperties',
  //     Object.getPrototypeOf(cl),
  //     'message',
  //   ),
  // );

  return ApiResponse({
    status: statusCode,
    type: customErrorRes(statusCode, message, error),
  });
}

export const ApiUnauthorizedResponse = () =>
  ApiResponse({
    status: 401,
    type: UnauthorizedResponse,
  });

export const ApiInternalErrorResponse = () =>
  ApiResponse({
    status: 500,
    type: InternalErrorResponse,
  });
