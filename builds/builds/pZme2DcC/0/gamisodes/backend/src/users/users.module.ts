import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustodialWallet, User, UserAuth0 } from 'src/db/entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MagicWallet } from 'src/db/entity/magicWallet.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuth0, MagicWallet, CustodialWallet]),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
