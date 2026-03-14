import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1772231992644 implements MigrationInterface {
    name = 'Version1772231992644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "unitPriceHT"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "unitPriceHT" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "totalPriceHT"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "totalPriceHT" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "totalPrice" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "totalPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "totalPriceHT"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "totalPriceHT" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_item" DROP COLUMN "unitPriceHT"`);
        await queryRunner.query(`ALTER TABLE "client_order_item" ADD "unitPriceHT" integer NOT NULL`);
    }

}
