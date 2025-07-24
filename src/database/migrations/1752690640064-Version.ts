import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1752690640064 implements MigrationInterface {
    name = 'Version1752690640064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "supplierPrice" integer NOT NULL, "recommendedSalePrice" integer, "currentSalePrice" integer, "objectId" integer NOT NULL, "object" character varying NOT NULL, CONSTRAINT "PK_e41e25472373d4b574b153229e9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "price_history"`);
    }

}
