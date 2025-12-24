import { BaseWeaponFilter } from './base-weapon.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class RiffleFilter extends BaseWeaponFilter {
  @ApiPropertyOptional({ description: 'Id du type de rail optique disponible' })
  @IsOptional()
  @IsNumber()
  railSizeId?: number;

  @ApiPropertyOptional({ description: 'Crosse ajustable ?' })
  @IsOptional()
  @IsBoolean()
  isAdjustableButt?: boolean;

  @ApiPropertyOptional({ description: 'Busc ajustable ?' })
  @IsOptional()
  @IsBoolean()
  isAdjustableBusk: boolean;

  @ApiPropertyOptional({ description: 'Vise mecanique ?' })
  @IsOptional()
  @IsBoolean()
  isOpenAim?: boolean;
}
