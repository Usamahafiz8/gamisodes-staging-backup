import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NiftoryApiService } from './niftory-api.service';
import { HttpModule } from '@nestjs/axios';
import { IAsyncParams } from './types';
import { NIFTORY_OPTIONS_PROVIDER } from './constants';

@Module({
  imports: [HttpModule],
  providers: [NiftoryApiService],
})
export class NiftoryApiModule {
  static async forRootAsync({
    useFactory,
    imports,
    inject,
  }: IAsyncParams): Promise<DynamicModule> {
    const OptionsProvider: Provider<any> = {
      provide: NIFTORY_OPTIONS_PROVIDER,
      useFactory,
      inject,
    };
    return {
      module: NiftoryApiModule,
      imports,
      providers: [NiftoryApiService, OptionsProvider],
      exports: [NiftoryApiService],
      global: true,
    };
  }
}
