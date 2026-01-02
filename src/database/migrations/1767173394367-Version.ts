import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1767173394367 implements MigrationInterface {
    name = 'Version1767173394367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "supplierPrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "supplierPrice" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "recommendedSalePrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "recommendedSalePrice" double precision`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "currentSalePrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "currentSalePrice" double precision`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "precentOfDiscount"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "precentOfDiscount" double precision`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "discountedPrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "discountedPrice" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "discountedPrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "discountedPrice" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "precentOfDiscount"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "precentOfDiscount" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "currentSalePrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "currentSalePrice" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "recommendedSalePrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "recommendedSalePrice" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "supplierPrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "supplierPrice" integer NOT NULL`);
    }

}
