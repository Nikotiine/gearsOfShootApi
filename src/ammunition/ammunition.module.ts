import { Module } from '@nestjs/common';
import { AmmunitionController } from './ammunition.controller';
import { AmmunitionService } from './ammunition.service';

@Module({
  controllers: [AmmunitionController],
  providers: [AmmunitionService]
})
export class AmmunitionModule {}
