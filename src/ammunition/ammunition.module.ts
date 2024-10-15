import { Module } from '@nestjs/common';
import { AmmunitionController } from './ammunition.controller';
import { AmmunitionService } from './ammunition.service';
import { AmmunitionHeadTypeService } from './ammunition-head-type/ammunition-head-type.service';
import { AmmunitionBodyTypeService } from './ammunition-body-type/ammunition-body-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { AmmunitionBodyType } from '../database/entity/ammunition-body-type.entity';
import { AmmunitionHeadType } from '../database/entity/ammunition-head-type.entity';
import { CommonModule } from '../common/common.module';
import { AmmunitionHeadTypeController } from './ammunition-head-type/ammunition-head-type.controller';
import { AmmunitionBodyTypeController } from './ammunition-body-type/ammunition-body-type.controller';

@Module({
  controllers: [AmmunitionController, AmmunitionHeadTypeController, AmmunitionBodyTypeController],
  providers: [
    AmmunitionService,
    AmmunitionHeadTypeService,
    AmmunitionBodyTypeService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Ammunition,
      AmmunitionBodyType,
      AmmunitionHeadType,
    ]),
    CommonModule,
  ],
})
export class AmmunitionModule {}
