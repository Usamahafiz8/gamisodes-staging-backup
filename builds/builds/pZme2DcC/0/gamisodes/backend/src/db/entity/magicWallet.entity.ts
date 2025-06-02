import { ApiExpose } from 'src/shared/utils';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'MagicWallet' })
export class MagicWallet {
  @Column()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @PrimaryColumn({ name: 'userEmail' })
  @ApiExpose('internship@gamisodes.com')
  userEmail: string;

  @Column()
  @ApiExpose('0x28352e926a61e880')
  address: string;

  @OneToOne(() => User, (user) => user.email)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;
}
