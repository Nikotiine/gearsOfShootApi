import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1772231800296 implements MigrationInterface {
    name = 'Version1772231800296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "totalPriceHt"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "totalPriceHt" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "vat"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "vat" double precision NOT NULL DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "totalPriceTTC"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "totalPriceTTC" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "totalPriceTTC"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "totalPriceTTC" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "vat"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "vat" integer NOT NULL DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "client_order" DROP COLUMN "totalPriceHt"`);
        await queryRunner.query(`ALTER TABLE "client_order" ADD "totalPriceHt" integer NOT NULL`);
    }

}
