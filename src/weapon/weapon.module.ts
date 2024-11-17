import { Module } from '@nestjs/common';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { WeaponTypeController } from './weapon-type/weapon-type.controller';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../database/entity/weapon.entity';
import { WeaponType } from '../database/entity/weapon-type.entity';
import { WeaponMagazine } from '../database/entity/weapon-magazine.entity';
import { CommonModule } from '../common/common.module';
import { MagazineService } from './magazine/magazine.service';
import { MagazineController } from './magazine/magazine.controller';
import { SoundReducerController } from './sound-reducer/sound-reducer.controller';
import { SoundNoiseReducer } from '../database/entity/sound-noise-reducer.entity';
import { SoundReducerService } from './sound-reducer/sound-reducer.service';
import { WeaponMagazineBodyType } from '../database/entity/weapon-magazine-body-type.entity';
import { BarrelTypeService } from './barrel-type/barrel-type.service';
import { WeaponBarrelType } from '../database/entity/weapon-barrel-type.entity';

@Module({
  controllers: [
    WeaponController,
    WeaponTypeController,
    MagazineController,
    SoundReducerController,
  ],
  providers: [
    WeaponService,
    WeaponTypeService,
    MagazineService,
    SoundReducerService,
    BarrelTypeService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Weapon,
      WeaponType,
      WeaponMagazine,
      SoundNoiseReducer,
      WeaponMagazineBodyType,
      WeaponBarrelType,
    ]),
    CommonModule,
  ],
})
export class WeaponModule {}
