import { Module } from '@nestjs/common';
import { WeaponTypeController } from './weapon-type/weapon-type.controller';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponType } from '../database/entity/weapon-type.entity';
import { WeaponMagazine } from '../database/entity/weapon-magazine.entity';
import { CommonModule } from '../common/common.module';
import { MagazineService } from './magazine/magazine.service';
import { MagazineController } from './magazine/magazine.controller';
import { BarrelTypeService } from './barrel-type/barrel-type.service';
import { WeaponBarrelType } from '../database/entity/weapon-barrel-type.entity';
import { ReloadModeService } from './reload-mode/reload-mode.service';
import { WeaponReloadMode } from '../database/entity/weapon-reload-mode.entity';
import { TriggerTypeService } from './trigger-type/trigger-type.service';
import { TriggerType } from '../database/entity/trigger-type.entity';
import { HandGunController } from './hand-gun/hand-gun.controller';
import { HandGunService } from './hand-gun/hand-gun.service';
import { HandGun } from '../database/entity/hand-gun.entity';
import { Riffle } from '../database/entity/riffle.entity';
import { RiffleController } from './riffle/riffle.controller';
import { RiffleService } from './riffle/riffle.service';
import { MLockOptionService } from './m-lock-option/m-lock-option.service';
import { MLockOption } from '../database/entity/m-lock-option.entity';
import { BarrelTypeController } from './barrel-type/barrel-type.controller';
import { ReloadModeController } from './reload-mode/reload-mode.controller';
import { TriggerTypeController } from './trigger-type/trigger-type.controller';
import { MLockOptionController } from './m-lock-option/m-lock-option.controller';
import { SaleModule } from '../sale/sale.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [
    WeaponTypeController,
    MagazineController,
    HandGunController,
    RiffleController,
    BarrelTypeController,
    ReloadModeController,
    TriggerTypeController,
    MLockOptionController,
  ],
  providers: [
    WeaponTypeService,
    MagazineService,
    BarrelTypeService,
    ReloadModeService,
    TriggerTypeService,
    HandGunService,
    RiffleService,
    MLockOptionService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      WeaponType,
      WeaponMagazine,
      WeaponBarrelType,
      WeaponReloadMode,
      TriggerType,
      HandGun,
      Riffle,
      MLockOption,
    ]),
    CommonModule,
    SaleModule,
    UserModule,
  ],
  exports: [HandGunService, RiffleService, MagazineService],
})
export class WeaponModule {}
