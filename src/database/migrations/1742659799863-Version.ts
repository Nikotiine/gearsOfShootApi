import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1742659799863 implements MigrationInterface {
    name = 'Version1742659799863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD "chicane" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD "estimatedNoiseReduction" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP COLUMN "estimatedNoiseReduction"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP COLUMN "chicane"`);
    }

}
