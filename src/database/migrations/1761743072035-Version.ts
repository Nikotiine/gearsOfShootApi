import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1761743072035 implements MigrationInterface {
    name = 'Version1761743072035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ADD "invoiceStatus" character varying NOT NULL DEFAULT 'IN_ORDER'`);
        await queryRunner.query(`ALTER TABLE "optic_ready_plate" ADD CONSTRAINT "UQ_ef55c7dd04ec2ab2745a10ab54d" UNIQUE ("name", "factoryId", "reference")`);
        await queryRunner.query(`ALTER TABLE "hand_gun" ADD CONSTRAINT "UQ_583a4ca651ce9ea896376da02bd" UNIQUE ("name", "variation", "factoryId", "caliberId", "reference")`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45" UNIQUE ("name", "variation", "factoryId", "caliberId", "reference")`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" ADD CONSTRAINT "UQ_9fa37f6d45eff4f9d0aa3f33ca3" UNIQUE ("totalPriceHt", "supplierId", "totalAccountHT", "totalInvoiceItems", "shippingCost")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_supplier" DROP CONSTRAINT "UQ_9fa37f6d45eff4f9d0aa3f33ca3"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45"`);
        await queryRunner.query(`ALTER TABLE "hand_gun" DROP CONSTRAINT "UQ_583a4ca651ce9ea896376da02bd"`);
        await queryRunner.query(`ALTER TABLE "optic_ready_plate" DROP CONSTRAINT "UQ_ef55c7dd04ec2ab2745a10ab54d"`);
        await queryRunner.query(`ALTER TABLE "invoice_supplier" DROP COLUMN "invoiceStatus"`);
    }

}
