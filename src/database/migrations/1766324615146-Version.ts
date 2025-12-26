import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1766324615146 implements MigrationInterface {
    name = 'Version1766324615146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_aa0e66e10ed382072347da06b1a"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_a80adddc99fe01642a641d168d8"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_9d5a0ce84bfa090c0ada5a1d53a"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_360b4fd0c606c0538a076d3fa92"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45"`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "caliberId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "factoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "typeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45" UNIQUE ("name", "variation", "factoryId", "caliberId", "reference")`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_aa0e66e10ed382072347da06b1a" FOREIGN KEY ("categoryId") REFERENCES "legislation_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_a80adddc99fe01642a641d168d8" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_9d5a0ce84bfa090c0ada5a1d53a" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_360b4fd0c606c0538a076d3fa92" FOREIGN KEY ("typeId") REFERENCES "weapon_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_360b4fd0c606c0538a076d3fa92"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_9d5a0ce84bfa090c0ada5a1d53a"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_a80adddc99fe01642a641d168d8"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "FK_aa0e66e10ed382072347da06b1a"`);
        await queryRunner.query(`ALTER TABLE "riffle" DROP CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45"`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "typeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "factoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "caliberId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "UQ_d8c88bbff42471b5e5b4fb3fc45" UNIQUE ("name", "variation", "reference", "caliberId", "factoryId")`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_360b4fd0c606c0538a076d3fa92" FOREIGN KEY ("typeId") REFERENCES "weapon_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_9d5a0ce84bfa090c0ada5a1d53a" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_a80adddc99fe01642a641d168d8" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD CONSTRAINT "FK_aa0e66e10ed382072347da06b1a" FOREIGN KEY ("categoryId") REFERENCES "legislation_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
