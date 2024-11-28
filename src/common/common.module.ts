import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { FactoryService } from './factory/factory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from '../database/entity/factory.entity';
import { CaliberController } from './caliber/caliber.controller';
import { CaliberService } from './caliber/caliber.service';
import { Caliber } from '../database/entity/caliber.entity';
import { ThreadedSizeService } from './threaded-size/threaded-size.service';
import { ThreadedSize } from '../database/entity/threaded-size.entity';
import { ThreadedSizeController } from './threaded-size/threaded-size.controller';
import { FactoryType } from '../database/entity/factory-type.entity';
import { FactoryTypeService } from './factory-type/factory-type.service';
import { LegislationCategoryService } from './legislation-category/legislation-category.service';
import { PercussionTypeService } from './percussion-type/percussion-type.service';
import { PercussionType } from '../database/entity/percussion-type.entity';
import { LegislationCategory } from '../database/entity/legislation-category.entity';
import { RailSizeService } from './rail-size/rail-size.service';
import { RailSize } from '../database/entity/rail-size.entity';
import { MaterialService } from './material/material.service';
import { Material } from '../database/entity/material.entity';

@Module({
  controllers: [FactoryController, CaliberController, ThreadedSizeController],
  providers: [
    FactoryService,
    CaliberService,
    ThreadedSizeService,
    FactoryTypeService,
    LegislationCategoryService,
    PercussionTypeService,
    RailSizeService,
    MaterialService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Factory,
      Caliber,
      ThreadedSize,
      FactoryType,
      PercussionType,
      LegislationCategory,
      RailSize,
      Material,
    ]),
  ],
  exports: [
    CaliberService,
    FactoryService,
    ThreadedSizeService,
    LegislationCategoryService,
    PercussionTypeService,
    RailSizeService,
    MaterialService,
  ],
})
export class CommonModule {}
