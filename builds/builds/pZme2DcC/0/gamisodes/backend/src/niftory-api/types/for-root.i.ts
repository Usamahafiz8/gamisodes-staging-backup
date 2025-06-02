import { DynamicModule, Type } from '@nestjs/common';
import { IAsyncOptions } from './async-options.i';

export interface IAsyncParams {
  useFactory: (...any: any[]) => IAsyncOptions;
  imports?: Type<any>[] | DynamicModule[] | Promise<DynamicModule>[];
  inject?: any;
}
