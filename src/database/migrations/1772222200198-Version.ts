import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1772222200198 implements MigrationInterface {
    name = 'Version1772222200198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP CONSTRAINT "FK_3715ce8b3b31b9541c73964d6dc"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ALTER COLUMN "orderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD CONSTRAINT "FK_3715ce8b3b31b9541c73964d6dc" FOREIGN KEY ("orderId") REFERENCES "client_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP CONSTRAINT "FK_3715ce8b3b31b9541c73964d6dc"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ALTER COLUMN "orderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD CONSTRAINT "FK_3715ce8b3b31b9541c73964d6dc" FOREIGN KEY ("orderId") REFERENCES "client_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
