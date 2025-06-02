import { MigrationInterface, QueryRunner } from 'typeorm';

export class WalletChangeId1692558527705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table "Wallet" rename column "id" to "_id"`);

    await queryRunner.query(
      `alter table "Wallet" add column "id" uuid DEFAULT uuid_generate_v4() unique`,
    );

    await queryRunner.query(
      `alter table "Wallet" 
        drop constraint "Wallet_pkey",
        drop column "_id"`,
    );

    await queryRunner.query(
      `alter table "Wallet" add constraint "Wallet_pkey" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO
  }
}
