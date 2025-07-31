import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1753860389639 implements MigrationInterface {
    name = 'Version1753860389639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" ADD "reason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" DROP COLUMN "reason"`);
    }

}
