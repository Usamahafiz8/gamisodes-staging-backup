import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModelNFT1696507637371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "ModelNfts" (
        "id" uuid DEFAULT uuid_generate_v4() unique,
        "niftoryId" uuid not null unique,
        "title" text not null,
        "description" text,
        "numEntities" bigint,
        "m_platform" text not null,
        "m_property" text not null,
        "m_collection" text not null,
        "m_series" int not null,
        "m_type" text  not null,
        "m_rarity" text,
        "m_missionNum" int,
        "m_mintLevel" int,
        "m_level" int,
        "m_rank" int,
        "m_editionSize" int,
        "m_artist" text,
        "m_signed" boolean,
        "m_externalURL" text,
        "m_copyright" text,
        "a_price" numeric(5, 2),
        "a_maxNftForUser" int,
        "a_isBlocked" boolean,
        "checkoutDisclaimer" text,
        "fileUrl" text,
        "isOpenEdition" boolean
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "ModelNfts"`);
  }
}
