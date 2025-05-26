import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1748277212910 implements MigrationInterface {
  name = 'Version1748277212910';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hand_gun" DROP COLUMN "adjustableTriggerValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hand_gun" ADD "adjustableTriggerMinWeight" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "hand_gun" ADD "adjustableTriggerMaxWeight" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hand_gun" DROP COLUMN "adjustableTriggerMaxWeight"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hand_gun" DROP COLUMN "adjustableTriggerMinWeight"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hand_gun" ADD "adjustableTriggerValue" character varying`,
    );
  }
}
