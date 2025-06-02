import { MigrationInterface, QueryRunner } from 'typeorm';

export class MagicWallet1699455291329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "MagicWallet" (
        "id" uuid DEFAULT uuid_generate_v4() unique primary key,
        "address" text unique,
        "userEmail" text not null unique
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "MagicWallet"`);
  }
}
