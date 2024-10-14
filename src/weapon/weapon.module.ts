import { Module } from '@nestjs/common';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { WeaponTypeController } from './weapon-type/weapon-type.controller';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../database/entity/weapon.entity';
import { WeaponType } from '../database/entity/weaponType.entity';
import { WeaponMagazine } from '../database/entity/weaponMagazine.entity';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [WeaponController, WeaponTypeController],
  providers: [WeaponService, WeaponTypeService],
  imports: [
    TypeOrmModule.forFeature([Weapon, WeaponType, WeaponMagazine]),
    CommonModule,
  ],
})
export class WeaponModule {}
