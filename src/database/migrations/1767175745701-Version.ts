import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1767175745701 implements MigrationInterface {
    name = 'Version1767175745701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weapon_magazine" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "hand_gun" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "optic" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "optic_collar" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "riffle" ADD "isDiscounted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "riffle" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "optic_collar" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "hand_gun" DROP COLUMN "isDiscounted"`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" DROP COLUMN "isDiscounted"`);
    }

}
