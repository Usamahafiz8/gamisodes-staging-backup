import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ModelOfGroup } from './modelOfGroup.entity';
import { ModelNFTs } from './modelNFT.entity';
import { File } from './file.entity';

export enum GroupTypeEnum {
  Pack = 'pack',
  Box = 'box',
  Wrapper = 'wrapper',
  WrapperKeep = 'wrapperKeep',
}

@Entity({ name: 'GroupsOfNfts' })
export class GroupsOfNfts {
  @PrimaryColumn()
  id: string;
  @Column({ enum: GroupTypeEnum, enumName: 'groupTypeEnum' })
  type: GroupTypeEnum;
  @Column()
  cardFaceModelId: string;
  @Column({ nullable: true })
  anotherVersionId: string;
  @Column({ nullable: true })
  unpackagingDate: Date;

  @OneToMany(() => ModelOfGroup, (model) => model.group)
  @JoinColumn({ name: 'id' })
  models: ModelOfGroup[];

  @ManyToMany(() => File)
  @JoinTable({
    name: 'FilesOfGroupOfNfts',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  files: File[];
  @ManyToOne(() => ModelNFTs, (model) => model.id)
  @JoinColumn({ name: 'cardFaceModelId', referencedColumnName: 'id' })
  cardFaceModel: ModelNFTs;

  // Fields for KeepWrapper type
  @OneToOne(() => GroupsOfNfts, (group) => group.id)
  @JoinColumn({ name: 'anotherVersionId', referencedColumnName: 'id' })
  anotherVersion: GroupsOfNfts;
}
