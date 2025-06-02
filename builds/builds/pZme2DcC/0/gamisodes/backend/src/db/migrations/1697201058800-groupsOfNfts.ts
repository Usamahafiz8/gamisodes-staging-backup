import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupsOfNfts1697201058800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create type "groupTypeEnum" as enum (
        'pack',
        'box',
        'wrapper'
      )`,
    );

    await queryRunner.query(
      `alter table "ModelNfts" 
        drop column "id",
        add column "new_id" uuid DEFAULT uuid_generate_v4() unique primary key`,
    );
    await queryRunner.query(
      `alter table "ModelNfts" 
        rename column "new_id" to "id"`,
    );

    await queryRunner.query(
      `create table if not exists "GroupsOfNfts" (
        "id" uuid DEFAULT uuid_generate_v4() unique primary key,
        "type" "groupTypeEnum" not null,
        "cardFaceModelId" uuid references "ModelNfts" on delete cascade not null
      )`,
    );
    await queryRunner.query(
      `create table if not exists "ModelOfGroup" (
        "id" uuid DEFAULT uuid_generate_v4() unique primary key,
        "groupId" uuid references "GroupsOfNfts" on delete cascade not null,
        "modelId" uuid references "ModelNfts" on delete cascade not null,
        "chance" numeric(2, 2)
      )`,
    );

    await queryRunner.query(
      `alter table "Nft" 
        drop column "id",
        add column "new_id" uuid DEFAULT uuid_generate_v4() unique primary key,
        alter column "serialNumber" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `alter table "Nft" 
        rename column "new_id" to "id"`,
    );
    await queryRunner.query(
      `create table if not exists "PendingGroups" (
        "id" uuid DEFAULT uuid_generate_v4() unique primary key,
        "groupId" uuid,
        "userId" uuid references "User" on delete cascade not null,
        "nftId" uuid references "Nft" on delete cascade not null
      )`,
    );
    await queryRunner.query(
      `create table if not exists "GroupFiles" (
        "groupId" uuid references "GroupsOfNfts" on delete cascade not null,
        "fileId" uuid references "Files" on delete cascade not null
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "GroupFiles"`);
    await queryRunner.query(`drop table "PendingGroups"`);
    await queryRunner.query(`drop table "ModelOfGroup"`);
    await queryRunner.query(`drop table "GroupsOfNfts"`);
    await queryRunner.query(`drop type "groupTypeEnum"`);
  }
}
