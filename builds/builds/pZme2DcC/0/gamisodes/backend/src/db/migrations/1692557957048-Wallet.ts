import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wallet1692557957048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "Wallet" (
        "id" text unique not null primary key,
        "address" text unique,
        "userEmail" text not null unique
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "Wallet"`);
  }
}
