import { MigrationInterface, QueryRunner } from 'typeorm';

export class CWalletChangeId1692563826014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "CustodialWallet" rename column "id" to "_id"`,
    );

    await queryRunner.query(
      `alter table "CustodialWallet" add column "id" uuid DEFAULT uuid_generate_v4() unique`,
    );

    await queryRunner.query(
      `alter table "CustodialWallet" 
        drop constraint "CustodialWallet_pkey",
        drop column "_id"`,
    );

    await queryRunner.query(
      `alter table "CustodialWallet" add constraint "CustodialWallet_pkey" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
