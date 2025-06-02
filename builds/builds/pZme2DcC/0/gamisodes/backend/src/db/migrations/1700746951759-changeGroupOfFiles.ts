import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeGroupOfFiles1700746951759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table if exists "GroupFiles" rename to "FilesOfGroupOfNfts"`,
    );
    await queryRunner.query(
      `create table if not exists "FilesOfGroupOfNftsModels" (
        "modelOfGroupId" uuid references "ModelOfGroup" on delete cascade not null,
        "fileId" uuid references "Files" on delete cascade not null
      )`,
    );
    await queryRunner.query(
      `insert into "FilesOfGroupOfNftsModels" ("modelOfGroupId", "fileId")
      select "id", "fileId" from "ModelOfGroup"
      where "fileId" is not null
      `,
    );
    await queryRunner.query(`alter table "ModelOfGroup" drop column "fileId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "ModelOfGroup" 
      add column "fileId" uuid references "Files" on delete cascade
    `,
    );
    await queryRunner.query(
      `update "ModelOfGroup"
      set "fileId" = (select "FilesOfGroupOfNftsModels"."fileId"
      from "FilesOfGroupOfNftsModels"
      left join "Files" on "Files"."id" = "FilesOfGroupOfNftsModels"."fileId"
      where "FilesOfGroupOfNftsModels"."modelOfGroupId" = "ModelOfGroup"."id"
      and "Files"."fileType" = 'video/mp4'
      )
      `,
    );
    await queryRunner.query(`drop table "FilesOfGroupOfNftsModels"`);
    await queryRunner.query(
      `alter table if exists "FilesOfGroupOfNfts" rename to "GroupFiles"`,
    );
  }
}
