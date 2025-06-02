import { ApiExpose } from 'src/shared/utils';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Session' })
export class Session {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column({ name: 'user_id' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  userId: string;

  @Column({ name: 'session_token' })
  @ApiExpose('')
  sessionToken: string;

  @Column()
  @ApiExpose(new Date())
  expires: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @ApiExpose({}, { type: User, required: false })
  user: User;
}
