import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GroupsOfNfts } from './groupsOfNfts.entity';
import { File } from './file.entity';

@Entity({ name: 'FilesOfGroupOfNftsModels' })
export class FilesOfGroupOfNftsModels {
  @PrimaryColumn()
  fileId: string;
  @PrimaryColumn()
  groupId: string;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'fileId', referencedColumnName: 'id' })
  file: File;
  @ManyToOne(() => GroupsOfNfts, (group) => group.id)
  @JoinColumn({ name: 'modelOfGroupId', referencedColumnName: 'id' })
  group: GroupsOfNfts;
}
