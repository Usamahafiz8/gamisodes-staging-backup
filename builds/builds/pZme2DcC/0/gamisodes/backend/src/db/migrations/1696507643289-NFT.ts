import { MigrationInterface, QueryRunner } from 'typeorm';

export class NFT1696507643289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "Nft" (
        "id" uuid DEFAULT uuid_generate_v4() unique,
        "userId" uuid,
        "status" text,
        "modelId" uuid not null,
        "niftoryId" uuid not null unique,
        "serialNumber" int not null
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "Nft"`);
  }
}
