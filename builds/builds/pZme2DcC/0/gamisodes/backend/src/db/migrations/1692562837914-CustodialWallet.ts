import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustodialWallet1692562837914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "CustodialWallet" (
        "id" text unique not null primary key,
        "niftoryWalletId" text unique,
        "userEmail" text not null unique
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "CustodialWallet"`);
  }
}
