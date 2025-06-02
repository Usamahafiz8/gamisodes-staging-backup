import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'UserAuth0' })
export class UserAuth0 {
  @PrimaryColumn({ name: 'auth0Id' })
  auth0Id: string;
  @PrimaryColumn({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
