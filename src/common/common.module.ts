import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { FactoryService } from './factory/factory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from '../database/entity/factory.entity';
import { CaliberController } from './caliber/caliber.controller';
import { CaliberService } from './caliber/caliber.service';
import { Caliber } from '../database/entity/caliber.entity';

@Module({
  controllers: [FactoryController, CaliberController],
  providers: [FactoryService, CaliberService],
  imports: [TypeOrmModule.forFeature([Factory, Caliber])],
})
export class CommonModule {}
