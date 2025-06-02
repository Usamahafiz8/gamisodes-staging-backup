import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ModelNfts' })
export class ModelNFTs {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: false })
  niftoryId: string;
  @Column()
  fileUrl: string;
  @Column({ nullable: false })
  title: string;
  @Column()
  description: string;
  @Column()
  numEntities: number;
  @Column({ nullable: false })
  m_platform: string;
  @Column({ nullable: false })
  m_property: string;
  @Column({ nullable: false })
  m_collection: string;
  @Column({ nullable: false })
  m_series: number;
  @Column({ nullable: false })
  m_type: string;
  @Column()
  m_rarity: string;
  @Column()
  m_missionNum: number;
  @Column()
  m_mintLevel: number;
  @Column()
  m_level: number;
  @Column()
  m_rank: number;
  @Column()
  m_editionSize: number;
  @Column()
  m_artist: string;
  @Column()
  m_signed: boolean;
  @Column()
  m_externalURL: string;
  @Column()
  m_copyright: string;
  @Column()
  a_price: number;
  @Column()
  a_maxNftForUser: number;
  @Column()
  a_isBlocked: boolean;
  @Column()
  checkoutDisclaimer: string;
  @Column()
  isOpenEdition: boolean;
}
