import { Module } from '@nestjs/common';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { WeaponTypeController } from './weapon-type/weapon-type.controller';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponType } from '../database/entity/weapon-type.entity';
import { WeaponMagazine } from '../database/entity/weapon-magazine.entity';
import { CommonModule } from '../common/common.module';
import { MagazineService } from './magazine/magazine.service';
import { MagazineController } from './magazine/magazine.controller';
import { SoundReducerController } from './sound-reducer/sound-reducer.controller';
import { SoundNoiseReducer } from '../database/entity/sound-noise-reducer.entity';
import { SoundReducerService } from './sound-reducer/sound-reducer.service';
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

@Module({
  controllers: [
    WeaponController,
    WeaponTypeController,
    MagazineController,
    SoundReducerController,
    HandGunController,
    RiffleController,
  ],
  providers: [
    WeaponService,
    WeaponTypeService,
    MagazineService,
    SoundReducerService,
    BarrelTypeService,
    ReloadModeService,
    TriggerTypeService,
    HandGunService,
    RiffleService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      WeaponType,
      WeaponMagazine,
      SoundNoiseReducer,
      WeaponBarrelType,
      WeaponReloadMode,
      TriggerType,
      HandGun,
      Riffle,
    ]),
    CommonModule,
  ],
})
export class WeaponModule {}
