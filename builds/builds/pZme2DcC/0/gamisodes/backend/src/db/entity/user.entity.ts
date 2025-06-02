import { ApiExpose } from 'src/shared/utils';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { CustodialWallet } from './custodialWallet.entity';
import { Session } from './session.entity';
import { Wallet } from './wallet.entity';
import { UserAuth0 } from './auth0.entity';
import { MagicWallet } from './magicWallet.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column()
  @ApiExpose('Gamisodes Internship')
  name: string;

  @Column()
  @ApiExpose('internship@gamisodes.com')
  email: string;

  @Column()
  @ApiExpose('https://image...')
  image: string;

  @Column({ name: 'emailVerified' })
  @ApiExpose()
  emailVerified: Date;

  @OneToMany(() => Account, (account) => account.user)
  @JoinTable({
    name: 'Account',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  accounts: Account[];

  @OneToMany(() => Session, (session) => session.user)
  @JoinTable({
    name: 'Session',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  sessions: Session[];

  @OneToMany(() => UserAuth0, (auth) => auth.user)
  @JoinTable({
    name: 'UserAuth0',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  auth0Ids: UserAuth0[];

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToOne(() => CustodialWallet, (wallet) => wallet.user)
  custodialWallet: CustodialWallet;

  @OneToOne(() => MagicWallet, (wallet) => wallet.user)
  magicWallet: MagicWallet;
}
