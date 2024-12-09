import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateWeaponDto, WeaponDto } from './weapon.dto';

import { RailSizeDto } from './rail-size.dto';

export class CreateRiffleDto extends CreateWeaponDto {
  @ApiProperty({ description: 'Crosse ajustable en profondeur' })
  @IsBoolean()
  isAdjustableButt: boolean;

  @ApiProperty({ description: 'Busc adjutable' })
  @IsBoolean()
  isAdjustableBusk: boolean;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  railSizeId: number;

  @ApiProperty({ description: 'Grenadiere' })
  grenadierSlot: number;

  @ApiProperty({ description: 'Port QC' })
  qcSlot: number;

  @ApiProperty({ description: 'Rail Mlock' })
  @IsBoolean()
  isMlockCompatibility: boolean;

  @ApiProperty({ description: 'Visee ouverte ?' })
  @IsBoolean()
  isOpenAim: boolean;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  mLockOptions: string;
}
export class UpdateRiffleDto extends CreateRiffleDto {
  @ApiProperty()
  id: number;
}
export class RiffleDto extends WeaponDto {
  @ApiProperty({ description: 'Crosse ajustable en profondeur' })
  isAdjustableButt: boolean;

  @ApiProperty({ description: 'Busc adjutable' })
  isAdjustableBusk: boolean;

  @ApiProperty({
    type: RailSizeDto,
  })
  railSize: RailSizeDto;

  @ApiProperty({ description: 'Grenadiere' })
  grenadierSlot: number;

  @ApiProperty({ description: 'Port QC' })
  qcSlot: number;

  @ApiProperty({ description: 'Rail Mlock' })
  isMlockCompatibility: boolean;

  @ApiProperty({ description: 'Visee ouverte ?' })
  isOpenAim: boolean;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  mLockOptions: string;
}
