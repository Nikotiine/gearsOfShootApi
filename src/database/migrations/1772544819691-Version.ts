import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1772544819691 implements MigrationInterface {
    name = 'Version1772544819691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" ADD "cartValidity" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" DROP COLUMN "cartValidity"`);
    }

}
