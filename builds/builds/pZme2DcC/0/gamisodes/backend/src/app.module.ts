import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GetConfigModule } from './config/config.module';
import { GetConfigService } from './config/config.service';
import { DbModule } from './db/db.module';
import { FilesModule } from './files/files.module';
import { GroupsNFTModule } from './groupsNfts/groupsNfts.module';
import { ModelsModule } from './models/models.module';
import { NftModule } from './nft/nft.module';
import { NiftoryApiModule } from './niftory-api/niftory-api.module';
import { ShopifyModule } from './shopify/shopify.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    DbModule,
    GetConfigModule,
    NiftoryApiModule.forRootAsync({
      useFactory: (config: GetConfigService) => ({
        url: config.safeGet('PUBLIC_API_PATH'),
        accessToken: config.safeGet('PUBLIC_API_KEY'),
        secretToken: config.safeGet('CLIENT_SECRET'),
      }),
      inject: [GetConfigService],
    }),
    AuthModule,
    UsersModule,
    WalletModule,
    NftModule,
    ShopifyModule.forRootAsync({
      useFactory: (config: GetConfigService) => ({
        accessToken: config.safeGet('ADMIN_API_ACCESS_TOKEN'),
        storeName: config.safeGet('STORE_NAME'),
        webhookUrl: config.safeGet('SHOPIFY_WEBHOOK'),
        timeoutTime: config.safeGet('TIMEOUT_MILLISECONDS'),
      }),
      inject: [GetConfigService],
    }),
    GroupsNFTModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (config: GetConfigService) => ({
          region: config.safeGet('AWS_REGION'),
          credentials: {
            accessKeyId: config.safeGet('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.safeGet('AWS_SECRET_ACCESS_KEY'),
          },
          // credentials: new EnvironmentCredentials('AWS'),
        }),
        inject: [GetConfigService],
      },
    }),
    FilesModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
