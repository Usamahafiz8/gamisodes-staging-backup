import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewGroupType1698076323429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter type "groupTypeEnum" rename to "_groupTypeEnum"`,
    );
    await queryRunner.query(
      `create type "groupTypeEnum" as enum (
        'pack',
        'box',
        'wrapper',
        'wrapperKeep'
      )`,
    );
    await queryRunner.query(
      `alter table "GroupsOfNfts" rename column "type" to "_type"`,
    );
    await queryRunner.query(
      `alter table "GroupsOfNfts" 
        add column "type" "groupTypeEnum" not null default 'wrapper',
        add column "unpackagingDate" timestamp,
        add column "anotherVersionId" uuid references "GroupsOfNfts"`,
    );
    await queryRunner.query(
      `update "GroupsOfNfts" set "type" = "_type"::text::"groupTypeEnum"`,
    );
    await queryRunner.query(`alter table "GroupsOfNfts" drop column "_type"`);
    await queryRunner.query(`drop type "_groupTypeEnum"`);
    await queryRunner.query(
      `alter table "ModelOfGroup" 
        add column "packagingModelId" uuid references "ModelNfts"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter type "groupTypeEnum" rename to "_groupTypeEnum"`,
    );
    await queryRunner.query(
      `create type "groupTypeEnum" as enum (
        'pack',
        'box',
        'wrapper'
      )`,
    );
    await queryRunner.query(
      `alter table "GroupsOfNfts" rename column "type" to "_type"`,
    );
    await queryRunner.query(
      `alter table "GroupsOfNfts" 
        add column "type" "groupTypeEnum" not null default 'wrapper',
        drop column "unpackagingDate",
        drop column "anotherVersionId"`,
    );
    await queryRunner.query(
      `update "GroupsOfNfts" set "type" = "_type"::text::"groupTypeEnum"`,
    );
    await queryRunner.query(`alter table "GroupsOfNfts" drop column "_type"`);
    await queryRunner.query(`drop type "_groupTypeEnum"`);
    await queryRunner.query(
      `alter table "ModelOfGroup" 
        add column "packagingModelId" uuid references "ModelNfts"`,
    );
  }
}
