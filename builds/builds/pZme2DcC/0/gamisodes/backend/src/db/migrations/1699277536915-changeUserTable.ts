import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserTable1699277536915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "UserAuth0" (
        "auth0Id" text unique not null,
        "userId" uuid references "User" on delete cascade not null,
        unique ("auth0Id", "userId")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "UserAuth0"`);
  }
}
