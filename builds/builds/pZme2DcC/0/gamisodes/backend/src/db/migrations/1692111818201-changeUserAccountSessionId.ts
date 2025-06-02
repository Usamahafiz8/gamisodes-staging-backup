import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserAccountSessionId1692111818201
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create extension if not exists "uuid-ossp"`);

    // Change in User table
    await queryRunner.query(`alter table "User" rename column "id" to "_id"`);
    await queryRunner.query(
      `alter table "User" add column "id" uuid DEFAULT uuid_generate_v4() unique`,
    );

    // Change in Session table
    await queryRunner.query(`alter table "Session" drop column "id"`);
    await queryRunner.query(
      `alter table "Session" rename column "user_id" to "_user_id"`,
    );
    await queryRunner.query(
      `alter table "Session" 
        add column "id" uuid DEFAULT uuid_generate_v4() primary key,
        add column "user_id" uuid references "User"("id") on delete cascade`,
    );
    await queryRunner.query(`update "Session" set "user_id" = (
        select "id" from "User" as "u" where "u"."_id" = "Session"."_user_id"
    )`);

    // Change in Account table
    await queryRunner.query(`alter table "Account" drop column "id"`);
    await queryRunner.query(
      `alter table "Account" rename column "user_id" to "_user_id"`,
    );
    await queryRunner.query(
      `alter table "Account" 
        add column "id" uuid DEFAULT uuid_generate_v4() primary key,
        add column "user_id" uuid references "User"("id") on delete cascade`,
    );
    await queryRunner.query(`update "Account" set "user_id" = (
        select "id" from "User" as "u" where "u"."_id" = "Account"."_user_id"
    )`);

    // Drop not use column
    await queryRunner.query(`alter table "Session" drop column "_user_id"`);
    await queryRunner.query(`alter table "Account" drop column "_user_id"`);
    await queryRunner.query(
      `alter table "User" 
        drop constraint "User_pkey",
        drop column "_id"`,
    );
    await queryRunner.query(
      `alter table "User" add constraint "User_pkey" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `alter table "Session" alter column "user_id" set not null`,
    );
    await queryRunner.query(
      `alter table "Account" alter column "user_id" set not null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO
  }
}
