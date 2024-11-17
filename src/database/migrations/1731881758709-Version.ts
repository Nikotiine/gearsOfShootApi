import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1731881758709 implements MigrationInterface {
    name = 'Version1731881758709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weapon_magazine_body_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_4c38208d7f0cdd9d24e5f91d532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_magazine" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "capacity" integer NOT NULL, "length" integer NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "reference" character varying NOT NULL, "bodyId" integer, "factoryId" integer, "caliberId" integer, CONSTRAINT "PK_4b3911fc7c13e3633b47419f14f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threaded_size" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "size" character varying NOT NULL, "ref" character varying NOT NULL, CONSTRAINT "UQ_45a48101ce6314eef5e97453b73" UNIQUE ("size"), CONSTRAINT "PK_5936350d9bd21d57bc65a11daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sound_noise_reducer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "diameter" integer NOT NULL, "length" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isCleanable" boolean NOT NULL DEFAULT false, "reference" character varying NOT NULL, "threadedSizeId" integer, "caliberId" integer, "factoryId" integer, CONSTRAINT "PK_e029ae95ad66819d729f37fa6e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factory_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_be448981a9c9dea86618f409aa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "optic_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, CONSTRAINT "PK_a27d10742b13616423a8098872d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "optic_focal_plane" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_c6517449193e6eff61a4b8eba5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "optic_unit" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_8103dfc692679fc6f98ced87c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "optic" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "minZoom" integer NOT NULL, "description" character varying NOT NULL, "maxZoom" integer NOT NULL, "bodyDiameter" integer NOT NULL, "lensDiameter" integer NOT NULL, "isParallax" boolean NOT NULL DEFAULT false, "maxElevation" integer NOT NULL, "minElevation" integer NOT NULL, "valueOfOneClick" integer NOT NULL, "minParallax" integer NOT NULL, "maxParallax" integer NOT NULL, "factoryId" integer, "focalPlaneId" integer, "opticUnitId" integer, "typeId" integer, CONSTRAINT "PK_89c5d3ed25bd01433c9159ba621" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, "description" character varying, "typeId" integer, CONSTRAINT "UQ_dffdebb893ec57cda6a4a38be46" UNIQUE ("name", "typeId"), CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition_head_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, CONSTRAINT "UQ_05720867558b7100c3d64d5109d" UNIQUE ("name"), CONSTRAINT "PK_1b52879ac1375efb4e2dbb60296" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition_body_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, CONSTRAINT "UQ_3bffa3ce3d70bbd4adb5c7af9e9" UNIQUE ("name"), CONSTRAINT "PK_ec928d7751b9220a8399b5a6c50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "legislation_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_d765af78ed0066afbc3d2e89f82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "percussion_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_fd1801d7e7779e2e1dd98c8d073" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ammunition" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "initialSpeed" integer NOT NULL, "packaging" integer NOT NULL, "reference" character varying NOT NULL, "categoryId" integer, "factoryId" integer, "caliberId" integer, "headTypeId" integer, "bodyTypeId" integer, "percussionTypeId" integer, CONSTRAINT "UQ_bdbf66a8e179ce54a305a7f9849" UNIQUE ("name", "factoryId", "packaging"), CONSTRAINT "PK_f0b206270265705a6754eb92807" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "caliber" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, CONSTRAINT "UQ_8f2ee75c04b327c695c6d3cf142" UNIQUE ("name"), CONSTRAINT "PK_c227dcd697dc6864ed64c1222a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_barrel_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_6f478763e0e4e1d120838c63c7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "variation" character varying, "description" character varying, "barrelLength" integer, "isOpticReady" boolean NOT NULL DEFAULT false, "isAdjustableTrigger" boolean NOT NULL DEFAULT false, "isThreadedBarrel" boolean NOT NULL DEFAULT false, "reference" character varying NOT NULL, "adjustableTriggerValue" character varying, "categoryId" integer, "caliberId" integer, "factoryId" integer, "typeId" integer, "barrelTypeId" integer, "threadedSizeId" integer, "percussionTypeId" integer, CONSTRAINT "UQ_49ba787177d54113fb866e97d85" UNIQUE ("name", "variation", "caliberId", "factoryId"), CONSTRAINT "PK_41fe726bde6432339c1d4595d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_reload_mode" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_13e4b263480ba86ce6401cb2708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ref" character varying NOT NULL, "modeId" integer, CONSTRAINT "UQ_d157be3fda9adaaec6c30e7042a" UNIQUE ("name"), CONSTRAINT "PK_41a9c64ef5dfc5c5c24107a0d1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "state" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "costumerRole" character varying NOT NULL DEFAULT 'Sans licence', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification_code" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" integer NOT NULL, "expireAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" ADD CONSTRAINT "FK_81277ee9ef231b877adaf24810b" FOREIGN KEY ("bodyId") REFERENCES "weapon_magazine_body_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" ADD CONSTRAINT "FK_03cae4529ccc1aa2ba60cdc303f" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" ADD CONSTRAINT "FK_4f00b7cb8d83de63d469b9f3226" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_a913fe2db9148907eadcd9c0263" FOREIGN KEY ("threadedSizeId") REFERENCES "threaded_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_a86131023baf17d81f2926b84c1" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" ADD CONSTRAINT "FK_afb1eed1b838db0ee041f0d8fef" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_8a71b00b7e9aad6f6145aa4a7e1" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_2aa6b3835c2dd178fde03b3cecd" FOREIGN KEY ("focalPlaneId") REFERENCES "optic_focal_plane"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_8bcdd09f5c1d7b1fc0bfeee95b0" FOREIGN KEY ("opticUnitId") REFERENCES "optic_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optic" ADD CONSTRAINT "FK_80a224e9bb095d989293abbfcad" FOREIGN KEY ("typeId") REFERENCES "optic_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factory" ADD CONSTRAINT "FK_a47c8e3d455a3ad8d7a1695b9c7" FOREIGN KEY ("typeId") REFERENCES "factory_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_5f28a8e554fea39e690105a40d0" FOREIGN KEY ("categoryId") REFERENCES "legislation_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_866bdda0d4d0cdacd2030b57aa4" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_b917ed97f82507e37dd4aebf062" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_5230d09e98108495c80ba235bc5" FOREIGN KEY ("headTypeId") REFERENCES "ammunition_head_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_eb57ae223a9467404fa83634e10" FOREIGN KEY ("bodyTypeId") REFERENCES "ammunition_body_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ammunition" ADD CONSTRAINT "FK_00883a798cc2e5a7eee8a070438" FOREIGN KEY ("percussionTypeId") REFERENCES "percussion_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_c2c45071e6311a5e6bd12121d7d" FOREIGN KEY ("categoryId") REFERENCES "legislation_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_d65520929f17dbb85bd3fa9baac" FOREIGN KEY ("caliberId") REFERENCES "caliber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_594472ad593b374e2a3afcee34b" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_b62f84ca78a3b7d61a2b8b36d58" FOREIGN KEY ("typeId") REFERENCES "weapon_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_0be03ae28447b4f6fc57b4c32f8" FOREIGN KEY ("barrelTypeId") REFERENCES "weapon_barrel_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_7424d869d7c4b65fbf3f3d07cb5" FOREIGN KEY ("threadedSizeId") REFERENCES "threaded_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_26fd3ab526b3718e7dc2dd8b961" FOREIGN KEY ("percussionTypeId") REFERENCES "percussion_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_type" ADD CONSTRAINT "FK_069fd876fa82df582506fda4468" FOREIGN KEY ("modeId") REFERENCES "weapon_reload_mode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification_code" ADD CONSTRAINT "FK_9d714363703b95d7bb9a9be0248" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification_code" DROP CONSTRAINT "FK_9d714363703b95d7bb9a9be0248"`);
        await queryRunner.query(`ALTER TABLE "weapon_type" DROP CONSTRAINT "FK_069fd876fa82df582506fda4468"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_26fd3ab526b3718e7dc2dd8b961"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_7424d869d7c4b65fbf3f3d07cb5"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_0be03ae28447b4f6fc57b4c32f8"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_b62f84ca78a3b7d61a2b8b36d58"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_594472ad593b374e2a3afcee34b"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_d65520929f17dbb85bd3fa9baac"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_c2c45071e6311a5e6bd12121d7d"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_00883a798cc2e5a7eee8a070438"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_eb57ae223a9467404fa83634e10"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_5230d09e98108495c80ba235bc5"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_b917ed97f82507e37dd4aebf062"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_866bdda0d4d0cdacd2030b57aa4"`);
        await queryRunner.query(`ALTER TABLE "ammunition" DROP CONSTRAINT "FK_5f28a8e554fea39e690105a40d0"`);
        await queryRunner.query(`ALTER TABLE "factory" DROP CONSTRAINT "FK_a47c8e3d455a3ad8d7a1695b9c7"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_80a224e9bb095d989293abbfcad"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_8bcdd09f5c1d7b1fc0bfeee95b0"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_2aa6b3835c2dd178fde03b3cecd"`);
        await queryRunner.query(`ALTER TABLE "optic" DROP CONSTRAINT "FK_8a71b00b7e9aad6f6145aa4a7e1"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_afb1eed1b838db0ee041f0d8fef"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_a86131023baf17d81f2926b84c1"`);
        await queryRunner.query(`ALTER TABLE "sound_noise_reducer" DROP CONSTRAINT "FK_a913fe2db9148907eadcd9c0263"`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" DROP CONSTRAINT "FK_4f00b7cb8d83de63d469b9f3226"`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" DROP CONSTRAINT "FK_03cae4529ccc1aa2ba60cdc303f"`);
        await queryRunner.query(`ALTER TABLE "weapon_magazine" DROP CONSTRAINT "FK_81277ee9ef231b877adaf24810b"`);
        await queryRunner.query(`DROP TABLE "verification_code"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "weapon_type"`);
        await queryRunner.query(`DROP TABLE "weapon_reload_mode"`);
        await queryRunner.query(`DROP TABLE "weapon"`);
        await queryRunner.query(`DROP TABLE "weapon_barrel_type"`);
        await queryRunner.query(`DROP TABLE "caliber"`);
        await queryRunner.query(`DROP TABLE "ammunition"`);
        await queryRunner.query(`DROP TABLE "percussion_type"`);
        await queryRunner.query(`DROP TABLE "legislation_category"`);
        await queryRunner.query(`DROP TABLE "ammunition_body_type"`);
        await queryRunner.query(`DROP TABLE "ammunition_head_type"`);
        await queryRunner.query(`DROP TABLE "factory"`);
        await queryRunner.query(`DROP TABLE "optic"`);
        await queryRunner.query(`DROP TABLE "optic_unit"`);
        await queryRunner.query(`DROP TABLE "optic_focal_plane"`);
        await queryRunner.query(`DROP TABLE "optic_type"`);
        await queryRunner.query(`DROP TABLE "factory_type"`);
        await queryRunner.query(`DROP TABLE "sound_noise_reducer"`);
        await queryRunner.query(`DROP TABLE "threaded_size"`);
        await queryRunner.query(`DROP TABLE "weapon_magazine"`);
        await queryRunner.query(`DROP TABLE "weapon_magazine_body_type"`);
    }

}
