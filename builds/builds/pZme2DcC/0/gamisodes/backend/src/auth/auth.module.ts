import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetConfigService } from 'src/config/config.service';
import { Account, Session, User, UserAuth0 } from 'src/db/entity';
import { NftModule } from 'src/nft/nft.module';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MagicLinkStrategy } from './strategy/magic-link.strategy';
import { Auth0JwtStrategy } from './strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, Account, UserAuth0, User]),
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: (config: GetConfigService) => ({
        secret: config.safeGet('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: config.safeGet('TIME_OF_ACCESS_KEY'),
        },
      }),
      inject: [GetConfigService],
    }),
    UsersModule,
    WalletModule,
    HttpModule,
    NftModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    MagicLinkStrategy,
    Auth0JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
