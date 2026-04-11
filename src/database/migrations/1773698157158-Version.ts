import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1773698157158 implements MigrationInterface {
    name = 'Version1773698157158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "factoryId" integer`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD CONSTRAINT "FK_14c558cfb305a09afba7298c7e2" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP CONSTRAINT "FK_14c558cfb305a09afba7298c7e2"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "factoryId"`);
    }

}
