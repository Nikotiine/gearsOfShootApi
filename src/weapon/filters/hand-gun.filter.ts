import { BaseWeaponFilter } from './base-weapon.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class HandGunFilter extends BaseWeaponFilter {
  @ApiPropertyOptional({ description: 'Optic Ready ?' })
  @IsOptional()
  @IsBoolean()
  isOpticReady?: boolean;

  @ApiPropertyOptional({ description: 'Id du type de detente' })
  @IsOptional()
  @IsNumber()
  triggerTypeId?: number;

  @ApiPropertyOptional({ description: 'Id du la matiere de la glissiere' })
  @IsOptional()
  @IsNumber()
  slideMaterialId?: number;
}
