import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1753782311180 implements MigrationInterface {
    name = 'Version1753782311180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "object" character varying NOT NULL, "objectId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "movement" character varying NOT NULL, "movementQuantity" integer NOT NULL, "previousQuantity" integer NOT NULL, "newQuantity" integer NOT NULL, "stockId" integer, CONSTRAINT "PK_16924caa54ac1fa49162ea3afca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD CONSTRAINT "FK_b910dfd033ccb6d561d0390858c" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" DROP CONSTRAINT "FK_b910dfd033ccb6d561d0390858c"`);
        await queryRunner.query(`DROP TABLE "stock_history"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
