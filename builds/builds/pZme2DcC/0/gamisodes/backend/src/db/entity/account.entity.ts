import { AuthProviderEnum, AuthTypeEnum } from 'src/shared/types';
import { ApiExpose } from 'src/shared/utils';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Account' })
export class Account {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column({ name: 'user_id' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  userId: string;

  @Column()
  @ApiExpose(AuthTypeEnum.MagicLink)
  type: AuthTypeEnum;

  @Column()
  @ApiExpose(AuthProviderEnum.App)
  provider: AuthProviderEnum;

  @Column({ name: 'provider_account_id' })
  @ApiExpose('108342625310615144393')
  providerAccountId: string;

  @Column({ name: 'access_token' })
  @ApiExpose('ya29.a0AeTM1ieVh...256')
  accessToken: string;

  @Column({ name: 'refresh_token' })
  @ApiExpose('ya29.a0AeTM1ieVh...any')
  refreshToken: string;

  @Column({ name: 'expires_at' })
  @ApiExpose(1671754412)
  expiresAt: number;

  @Column({ name: 'token_type' })
  @ApiExpose('Bearer')
  tokenType: string;

  @Column()
  @ApiExpose('openid email ...any')
  scope: string;

  @Column({ name: 'id_token' })
  @ApiExpose('eyJhbGciOiJSUzI1NiIs...any')
  idToken: string;

  @Column({ name: 'session_state' })
  @ApiExpose('')
  sessionState: string;

  @Column({ name: 'oauth_token_secret' })
  @ApiExpose('')
  oauthTokenSecret: string;

  @Column({ name: 'oauth_token' })
  @ApiExpose('')
  oauthToken: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @ApiExpose({}, { type: User, required: false })
  user: User;
}
