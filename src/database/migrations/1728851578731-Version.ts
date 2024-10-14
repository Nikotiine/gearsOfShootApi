import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1728851578731 implements MigrationInterface {
    name = 'Version1728851578731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "costumerRole" character varying NOT NULL DEFAULT 'Sans licence', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition_head_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, CONSTRAINT "PK_1b52879ac1375efb4e2dbb60296" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition_body_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, CONSTRAINT "PK_ec928d7751b9220a8399b5a6c50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "initialSpeed" integer NOT NULL, "percussionType" character varying NOT NULL, "packaging" integer NOT NULL, "factoryId" integer, "caliberId" integer, "headTypeId" integer, "bodyTypeId" integer, CONSTRAINT "PK_f0b206270265705a6754eb92807" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threaded_size" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "size" character varying NOT NULL, CONSTRAINT "PK_5936350d9bd21d57bc65a11daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sound_noise_reducer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "diameter" integer NOT NULL, "length" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isCleanable" boolean NOT NULL DEFAULT false, "threadedSizeId" integer, "caliberId" integer, "factoryId" integer, CONSTRAINT "PK_e029ae95ad66819d729f37fa6e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "caliber" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, CONSTRAINT "PK_c227dcd697dc6864ed64c1222a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, CONSTRAINT "PK_41a9c64ef5dfc5c5c24107a0d1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "variation" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "barrelLength" integer NOT NULL, "isOpticReady" boolean NOT NULL DEFAULT false, "isAdjustableTrigger" boolean NOT NULL DEFAULT false, "isThreadedBarrel" boolean NOT NULL DEFAULT false, "barrelType" character varying NOT NULL DEFAULT 'Normal', "caliberId" integer, "factoryId" integer, "typeId" integer, "threadedSizeId" integer, CONSTRAINT "PK_41fe726bde6432339c1d4595d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "description" character varying, "factoryType" character varying NOT NULL, CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_magazine" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "capacity" integer NOT NULL, "body" character varying NOT NULL, "length" integer NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "factoryId" integer, CONSTRAINT "PK_4b3911fc7c13e3633b47419f14f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_866bdda0d4d0cdacd2030b57aa4" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_b917ed97f82507e37dd4aebf062" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_5230d09e98108495c80ba235bc5" FOREIGN KEY ("headTypeId") REFERENCES "ammunition_head_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_eb57ae223a9467404fa83634e10" FOREIGN KEY ("bodyTypeId") REFERENCES "ammunition_body_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_a913fe2db9148907eadcd9c0263" FOREIGN KEY ("threadedSizeId") REFERENCES "threaded_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_a86131023baf17d81f2926b84c1" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_afb1eed1b838db0ee041f0d8fef" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_d65520929f17dbb85bd3fa9baac" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_594472ad593b374e2a3afcee34b" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_b62f84ca78a3b7d61a2b8b36d58" FOREIGN KEY ("typeId") REFERENCES "weapon_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_7424d869d7c4b65fbf3f3d07cb5" FOREIGN KEY ("threadedSizeId") REFERENCES "threaded_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" ADD CONSTRAINT "FK_03cae4529ccc1aa2ba60cdc303f" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weapon_magazine" DROP CONSTRAINT "FK_03cae4529ccc1aa2ba60cdc303f"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_7424d869d7c4b65fbf3f3d07cb5"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_b62f84ca78a3b7d61a2b8b36d58"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_594472ad593b374e2a3afcee34b"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_d65520929f17dbb85bd3fa9baac"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_afb1eed1b838db0ee041f0d8fef"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_a86131023baf17d81f2926b84c1"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_a913fe2db9148907eadcd9c0263"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_eb57ae223a9467404fa83634e10"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_5230d09e98108495c80ba235bc5"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_b917ed97f82507e37dd4aebf062"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_866bdda0d4d0cdacd2030b57aa4"`);
        await queryRunner.query(`DROP TABLE "weapon_magazine"`);
        await queryRunner.query(`DROP TABLE "factory"`);
        await queryRunner.query(`DROP TABLE "weapon"`);
        await queryRunner.query(`DROP TABLE "weapon_type"`);
        await queryRunner.query(`DROP TABLE "caliber"`);
        await queryRunner.query(`DROP TABLE "sound_noise_reducer"`);
        await queryRunner.query(`DROP TABLE "threaded_size"`);
        await queryRunner.query(`DROP TABLE "ammunition"`);
        await queryRunner.query(`DROP TABLE "ammunition_body_type"`);
        await queryRunner.query(`DROP TABLE "ammunition_head_type"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
