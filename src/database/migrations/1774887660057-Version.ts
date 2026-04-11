import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1774887660057 implements MigrationInterface {
    name = 'Version1774887660057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_e49861f3b2240e06888cf9c2ce5" UNIQUE ("firstName", "lastName", "streetNumber", "city", "state", "zipCode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_e49861f3b2240e06888cf9c2ce5"`);
    }

}
