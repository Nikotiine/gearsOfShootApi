import { Module } from '@nestjs/common';
import { NewItemsService } from './new-items/new-items.service';
import { DashboardController } from './dashboard.controller';
import { AccessoryModule } from '../accessory/accessory.module';
import { AmmunitionModule } from '../ammunition/ammunition.module';
import { OpticModule } from '../optic/optic.module';
import { WeaponModule } from '../weapon/weapon.module';

@Module({
  providers: [NewItemsService],
  controllers: [DashboardController],
  imports: [AccessoryModule, AmmunitionModule, OpticModule, WeaponModule],
})
export class DashboardModule {}
