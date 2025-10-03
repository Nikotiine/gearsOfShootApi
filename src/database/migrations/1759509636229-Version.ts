import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1759509636229 implements MigrationInterface {
    name = 'Version1759509636229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ADD "invoiceSupplierReference" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" DROP COLUMN "invoiceSupplierReference"`);
    }

}
