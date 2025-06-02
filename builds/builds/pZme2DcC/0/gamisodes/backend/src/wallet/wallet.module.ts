import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustodialWallet, NFTs, Wallet } from 'src/db/entity';
import { UsersModule } from 'src/users/users.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Wallet, CustodialWallet, NFTs]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
