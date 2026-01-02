import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1766945161040 implements MigrationInterface {
    name = 'Version1766945161040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" ADD "precentOfDiscount" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "discountedPrice" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "discountedPrice"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "precentOfDiscount"`);
    }

}
