import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1770294886987 implements MigrationInterface {
    name = 'Version1770294886987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "street" character varying NOT NULL, "streetNumber" character varying NOT NULL, "additionalStreet" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "state" character varying NOT NULL, "additionalInformation" character varying NOT NULL, "userAddressId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD "totalPriceTTC" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD "totalItems" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD "shippingAddressId" integer`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_a759b714ad493c88fb0d2eefed5" FOREIGN KEY ("userAddressId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD CONSTRAINT "FK_b9c2ed79ef63fafef582587cc4e" FOREIGN KEY ("shippingAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" ADD CONSTRAINT "FK_30bcdcd7a75d8621200054be13c" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP CONSTRAINT "FK_30bcdcd7a75d8621200054be13c"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP CONSTRAINT "FK_b9c2ed79ef63fafef582587cc4e"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_a759b714ad493c88fb0d2eefed5"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP COLUMN "shippingAddressId"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP COLUMN "totalItems"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP COLUMN "totalPriceTTC"`);
        await queryRunner.query(`ALTER TABLE "client_order_entity" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "zipCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
