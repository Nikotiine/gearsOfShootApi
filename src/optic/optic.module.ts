import { Module } from '@nestjs/common';
import { OpticController } from './optic.controller';
import { OpticService } from './optic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';
import { OpticTypeService } from './optic-type/optic-type.service';
import { OpticType } from '../database/entity/optic-type.entity';
import { OpticTypeController } from './optic-type/optic-type.controller';

@Module({
  controllers: [OpticController, OpticTypeController],
  providers: [OpticService, OpticTypeService],
  imports: [TypeOrmModule.forFeature([Optic, OpticType])],
})
export class OpticModule {}
