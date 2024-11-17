import { Module } from '@nestjs/common';
import { OpticController } from './optic.controller';
import { OpticService } from './optic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';
import { OpticTypeService } from './optic-type/optic-type.service';
import { OpticType } from '../database/entity/optic-type.entity';
import { OpticTypeController } from './optic-type/optic-type.controller';
import { CommonModule } from '../common/common.module';
import { OpticFocalPlane } from '../database/entity/optic-focal-plane.entity';
import { OpticUnit } from '../database/entity/optic-unit.entity';
import { OpticFocalPlaneService } from './optic-focal-plane/optic-focal-plane.service';
import { OpticUnitService } from './optic-unit/optic-unit.service';

@Module({
  controllers: [OpticController, OpticTypeController],
  providers: [OpticService, OpticTypeService, OpticFocalPlaneService, OpticUnitService],
  imports: [
    TypeOrmModule.forFeature([Optic, OpticType, OpticFocalPlane, OpticUnit]),
    CommonModule,
  ],
})
export class OpticModule {}
