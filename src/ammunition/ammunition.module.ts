import { Module } from '@nestjs/common';
import { AmmunitionController } from './ammunition.controller';
import { AmmunitionService } from './ammunition.service';
import { AmmunitionHeadTypeService } from './ammunition-head-type/ammunition-head-type.service';
import { AmmunitionBodyTypeService } from './ammunition-body-type/ammunition-body-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { AmmunitionBodyType } from '../database/entity/ammunitionBodyType.entity';
import { AmmunitionHeadType } from '../database/entity/ammunitionHeadType.entity';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [AmmunitionController],
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
