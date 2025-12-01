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
import { OpticCollarService } from './optic-collar/optic-collar.service';
import { OpticCollarController } from './optic-collar/optic-collar.controller';
import { OpticCollar } from '../database/entity/optic-collar.entity';
import { OpticFocalPlaneController } from './optic-focal-plane/optic-focal-plane.controller';
import { OpticUnitController } from './optic-unit/optic-unit.controller';
import { SaleModule } from '../sale/sale.module';
import { OpticClick } from '../database/entity/optic-click.entity';
import { OpticClickController } from './optic-click/optic-click.controller';
import { OpticClickService } from './optic-click/optic-click.service';

@Module({
  controllers: [
    OpticController,
    OpticTypeController,
    OpticCollarController,
    OpticFocalPlaneController,
    OpticUnitController,
    OpticClickController,
  ],
  providers: [
    OpticService,
    OpticTypeService,
    OpticFocalPlaneService,
    OpticUnitService,
    OpticCollarService,
    OpticClickService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Optic,
      OpticType,
      OpticFocalPlane,
      OpticUnit,
      OpticCollar,
      OpticClick,
    ]),
    CommonModule,
    SaleModule,
  ],
  exports: [OpticService, OpticCollarService],
})
export class OpticModule {}
