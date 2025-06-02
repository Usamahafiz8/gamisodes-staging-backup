import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersProfilesAccount1692026641583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "User" (
        "id" text unique not null primary key,
        "name" text,
        "email" text not null unique,
        "emailVerified" timestamp,
        "image" text
      )`,
    );

    await queryRunner.query(
      `create table if not exists "Account" (
        "id" text unique not null,
        "user_id" text references "User" on delete cascade not null,
        "type" text not null,
        "provider" text not null,
        "provider_account_id" text not null unique,
        "refresh_token" text,
        "access_token" text,
        "token_type" text not null,
        "id_token" text not null,
        "session_state" text,
        "oauth_token_secret" text,
        "oauth_token" text,
        "expires_at" int,
        "scope" text
      )`,
    );

    await queryRunner.query(
      `create table if not exists "Session" (
        "id" text unique not null,
        "session_token" text unique not null,
        "user_id" text references "User" on delete cascade not null,
        "expires" timestamp
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "Session"`);
    await queryRunner.query(`drop table "Account"`);
    await queryRunner.query(`drop table "User"`);
  }
}
