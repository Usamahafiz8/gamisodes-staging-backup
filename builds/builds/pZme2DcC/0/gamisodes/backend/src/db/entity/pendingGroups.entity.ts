import { ApiExpose } from 'src/shared/utils';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'PendingGroups' })
export class PendingGroups {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column({ name: 'groupId', type: 'uuid' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  groupId: string;

  @Column({ name: 'userId', type: 'uuid' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  userId: string;

  @Column({ name: 'nftId', type: 'uuid' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  nftId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
