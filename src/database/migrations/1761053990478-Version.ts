import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1761053990478 implements MigrationInterface {
    name = 'Version1761053990478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "comment" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "shipmentNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "comment" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "totalAccountHT" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "shippingCost" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "shippingCost" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "totalAccountHT" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "comment" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "shipmentNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ALTER COLUMN "comment" SET NOT NULL`);
    }

}
