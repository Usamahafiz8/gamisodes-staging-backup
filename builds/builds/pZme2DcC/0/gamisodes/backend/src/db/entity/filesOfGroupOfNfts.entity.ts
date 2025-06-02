import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { File } from './file.entity';
import { ModelOfGroup } from './modelOfGroup.entity';

@Entity({ name: 'FilesOfGroupOfNfts' })
export class FilesOfGroupOfNfts {
  @PrimaryColumn()
  fileId: string;
  @PrimaryColumn()
  modelOfGroupId: string;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'fileId', referencedColumnName: 'id' })
  file: File;
  @ManyToOne(() => ModelOfGroup, (model) => model.id)
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  group: ModelOfGroup;
}
