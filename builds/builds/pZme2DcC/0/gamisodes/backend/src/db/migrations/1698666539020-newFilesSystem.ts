import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewFilesSystem1698666539020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "ModelOfGroup"
        add column "fileId" uuid references "Files" on delete cascade`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "ModelOfGroup"
        drop column "fileId"`,
    );
  }
}
