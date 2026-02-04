import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1770232526592 implements MigrationInterface {
    name = 'Version1770232526592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_order_item_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "object" character varying NOT NULL, "objectId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "unitPriceHT" integer NOT NULL, "totalPriceHT" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'IN_ORDER', "ordersId" integer, CONSTRAINT "PK_e24bdba707559954e2bf8cb46aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_order_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "totalPriceHt" integer NOT NULL, "vat" integer NOT NULL DEFAULT '20', "shippingCost" integer NOT NULL DEFAULT '0', "invoiceStatus" character varying NOT NULL DEFAULT 'IN_ORDER', "created_by" integer, "updated_by" integer, "deleted_by" integer, CONSTRAINT "PK_652ea5b5cd120539e059e35af51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client_order_item_entity" ADD CONSTRAINT "FK_6a2d7946f122b1c93d2d2005ddb" FOREIGN KEY ("ordersId") REFERENCES "client_order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD CONSTRAINT "FK_00b4f9e05aae5dbc62b0f384844" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD CONSTRAINT "FK_97b58e162ab1ce6ec40c743107d" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD CONSTRAINT "FK_36881822c2eed45e5b29f987a61" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP CONSTRAINT "FK_36881822c2eed45e5b29f987a61"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP CONSTRAINT "FK_97b58e162ab1ce6ec40c743107d"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP CONSTRAINT "FK_00b4f9e05aae5dbc62b0f384844"`);
        await queryRunner.query(`ALTER TABLE "client_order_item_entity" DROP CONSTRAINT "FK_6a2d7946f122b1c93d2d2005ddb"`);
        await queryRunner.query(`DROP TABLE "client_order_entity"`);
        await queryRunner.query(`DROP TABLE "client_order_item_entity"`);
    }

}
