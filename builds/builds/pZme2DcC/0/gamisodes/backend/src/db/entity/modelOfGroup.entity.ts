import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { GroupsOfNfts } from './groupsOfNfts.entity';
import { ModelNFTs } from './modelNFT.entity';
import { File } from './file.entity';

@Entity({ name: 'ModelOfGroup' })
export class ModelOfGroup {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: true })
  groupId: string;
  @Column({ nullable: true })
  modelId: string;
  @Column({ nullable: true })
  chance: number;
  @Column({ nullable: true })
  packagingModelId: string;

  @ManyToOne(() => ModelNFTs, (model) => model.niftoryId)
  @JoinColumn({ name: 'modelId', referencedColumnName: 'id' })
  model: ModelNFTs;
  @ManyToOne(() => ModelNFTs, (model) => model.niftoryId)
  @JoinColumn({ name: 'packagingModelId', referencedColumnName: 'id' })
  packagingModel: ModelNFTs;
  @ManyToOne(() => GroupsOfNfts, (group) => group.id)
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  group: GroupsOfNfts;

  @ManyToMany(() => File)
  @JoinTable({
    name: 'FilesOfGroupOfNftsModels',
    joinColumn: { name: 'modelOfGroupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  files: File[];
}
