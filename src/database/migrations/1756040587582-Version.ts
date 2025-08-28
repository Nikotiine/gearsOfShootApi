import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1756040587582 implements MigrationInterface {
    name = 'Version1756040587582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD CONSTRAINT "FK_b3f18b63aa85b88196a48777375" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD CONSTRAINT "FK_8db901e8074a15c3326df51a889" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD CONSTRAINT "FK_3daf6e6d11d91bae053cceaf34d" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_history" DROP CONSTRAINT "FK_3daf6e6d11d91bae053cceaf34d"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP CONSTRAINT "FK_8db901e8074a15c3326df51a889"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP CONSTRAINT "FK_b3f18b63aa85b88196a48777375"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP COLUMN "created_by"`);
    }

}
