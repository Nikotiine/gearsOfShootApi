import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1740318441994 implements MigrationInterface {
    name = 'Version1740318441994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_b61d30ac5551a7a84ba33b5f54f"`);
        await queryRunner.query(`ALTER TABLE "optic" RENAME COLUMN "providedCollarId" TO "reference"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "optic" ADD "reference" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optic" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "optic" ADD "reference" integer`);
        await queryRunner.query(`ALTER TABLE "optic" RENAME COLUMN "reference" TO "providedCollarId"`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_b61d30ac5551a7a84ba33b5f54f" FOREIGN KEY ("providedCollarId") REFERENCES "optic_collar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
