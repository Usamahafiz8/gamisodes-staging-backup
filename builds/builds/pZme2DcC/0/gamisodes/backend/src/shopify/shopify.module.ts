import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingOrders } from 'src/db/entity';
import { NftModule } from 'src/nft/nft.module';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { SHOPIFY_OPTIONS_PROVIDER } from './constants';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { IAsyncParams } from './types';
import { GroupsNFTModule } from 'src/groupsNfts/groupsNfts.module';

export class ShopifyModule {
  static async forRootAsync({
    useFactory,
    imports,
    inject,
  }: IAsyncParams): Promise<DynamicModule> {
    const OptionsProvider: Provider<any> = {
      provide: SHOPIFY_OPTIONS_PROVIDER,
      useFactory,
      inject,
    };
    return {
      module: ShopifyModule,
      imports: [
        HttpModule,
        NftModule,
        UsersModule,
        WalletModule,
        TypeOrmModule.forFeature([PendingOrders]),
        GroupsNFTModule,
        ...(imports || []),
      ],
      controllers: [ShopifyController],
      providers: [ShopifyService, OptionsProvider],
      exports: [ShopifyService],
      global: true,
    };
  }
}
