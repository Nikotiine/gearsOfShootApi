import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1761052242752 implements MigrationInterface {
    name = 'Version1761052242752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "vat" SET DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "invoiceSupplierReference" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "invoiceSupplierReference" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ALTER COLUMN "vat" DROP DEFAULT`);
    }

}
