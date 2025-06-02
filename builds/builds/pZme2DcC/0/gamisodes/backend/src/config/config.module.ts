import { Global, Module } from '@nestjs/common';
import { GetConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation-schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [GetConfigService],
  exports: [GetConfigService],
})
export class GetConfigModule {}
