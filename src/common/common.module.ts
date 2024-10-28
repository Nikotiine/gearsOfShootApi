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
import { FactoryType } from '../database/entity/factoryType.entity';
import { FactoryTypeService } from './factory-type/factory-type.service';

@Module({
  controllers: [FactoryController, CaliberController, ThreadedSizeController],
  providers: [FactoryService, CaliberService, ThreadedSizeService, FactoryTypeService],
  imports: [
    TypeOrmModule.forFeature([Factory, Caliber, ThreadedSize, FactoryType]),
  ],
  exports: [CaliberService, FactoryService, ThreadedSizeService],
})
export class CommonModule {}
