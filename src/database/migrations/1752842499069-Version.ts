import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1752842499069 implements MigrationInterface {
    name = 'Version1752842499069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic" ADD "providedOpticCollarSizeId" integer`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_f8c2fef7b5a92aa2ac3c0f324bb" FOREIGN KEY ("providedOpticCollarSizeId") REFERENCES "rail_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_f8c2fef7b5a92aa2ac3c0f324bb"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP COLUMN "providedOpticCollarSizeId"`);
    }

}
