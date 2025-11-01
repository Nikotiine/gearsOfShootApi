import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1761048661897 implements MigrationInterface {
    name = 'Version1761048661897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_invoice_supplier" DROP COLUMN "description"`);
    }

}
