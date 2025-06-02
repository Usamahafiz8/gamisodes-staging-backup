import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFTs } from 'src/db/entity';

@Module({
  imports: [UsersModule, WalletModule, TypeOrmModule.forFeature([NFTs])],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
})
export class NftModule {}
