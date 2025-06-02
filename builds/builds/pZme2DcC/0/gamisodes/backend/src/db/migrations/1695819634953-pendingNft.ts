import { MigrationInterface, QueryRunner } from 'typeorm';

export class PendingNft1695819634953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table if not exists "PendingOrders" (
        "id" uuid DEFAULT uuid_generate_v4() unique,
        "nftId" uuid[] unique not null,
        "orderId" bigint not null,
        "lineItemId" bigint not null,
        "quantity" int not null
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "PendingOrders"`);
  }
}
