import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitiateFileTable1697201058771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "Files" (
          "id" uuid DEFAULT uuid_generate_v4() unique primary key,
          "fileType" text not null,
          "key" text not null unique,
          "url" text not null unique
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "Files"`);
  }
}
