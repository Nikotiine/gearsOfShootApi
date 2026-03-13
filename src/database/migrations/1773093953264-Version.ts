import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1773093953264 implements MigrationInterface {
    name = 'Version1773093953264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" ADD "orderId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" DROP COLUMN "orderId"`);
    }

}
