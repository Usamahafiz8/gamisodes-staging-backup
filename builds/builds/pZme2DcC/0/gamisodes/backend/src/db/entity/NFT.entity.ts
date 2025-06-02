import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelNFTs } from './modelNFT.entity';

@Entity({ name: 'Nft' })
export class NFTs {
  @PrimaryColumn()
  id: string;
  @Column()
  userId: string;
  @Column({ nullable: false })
  status: string;
  @Column({ nullable: false })
  modelId: string;
  @Column({ nullable: false })
  niftoryId: string;
  @Column({ nullable: false, default: 0 })
  serialNumber: number;

  @ManyToOne(() => ModelNFTs, (model) => model.niftoryId)
  @JoinColumn({ name: 'modelId', referencedColumnName: 'niftoryId' })
  model: ModelNFTs;
}
