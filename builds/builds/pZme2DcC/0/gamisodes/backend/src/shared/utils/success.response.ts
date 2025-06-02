import { ApiResponse } from '@nestjs/swagger';
import { MessagesEnum } from '../types';
import { ApiExpose } from './apiExpose.decorator';

export class SuccessResponse<T = any> {
  constructor(data: any, success?: boolean) {
    this.data = data;
    this.success = success !== undefined ? success : true;
  }

  @ApiExpose(MessagesEnum.SUCCESSFUL)
  data: T;
  @ApiExpose(true)
  success: boolean = true;
}

const customSuccessRes = <T = any>(data?: T) => {
  class CustomSuccessRes extends SuccessResponse<T> {
    @ApiExpose(data)
    data = data;
  }
  return CustomSuccessRes;
};

export const ApiSuccessResponse = (data?: any) =>
  data
    ? ApiResponse({ status: 200, type: customSuccessRes(data) })
    : ApiResponse({ status: 200, type: SuccessResponse });
