import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { GetConfigModule } from 'src/config/config.module';
import { GetConfigService } from 'src/config/config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: GetConfigService) => ({
        type: 'postgres',
        host: configService.safeGet('DB_HOST'),
        port: configService.safeGet('DB_PORT'),
        database: configService.safeGet('DB_NAME'),
        username: configService.safeGet('DB_USERNAME'),
        password: configService.safeGet('DB_PASSWORD'),
        autoLoadEntities: true,
      }),
      imports: [GetConfigModule],
      inject: [GetConfigService],
    }),
  ],
})
export class DbModule {}
