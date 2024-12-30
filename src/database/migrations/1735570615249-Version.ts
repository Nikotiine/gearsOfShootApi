import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1735570615249 implements MigrationInterface {
    name = 'Version1735570615249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic_collar" ADD "factoryId" integer`);
        await queryRunner.query(`ALTER TABLE "optic_collar" ADD CONSTRAINT "FK_728be5098b2bb250041cea70a9a" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic_collar" DROP CONSTRAINT "FK_728be5098b2bb250041cea70a9a"`);
        await queryRunner.query(`ALTER TABLE "optic_collar" DROP COLUMN "factoryId"`);
    }

}
