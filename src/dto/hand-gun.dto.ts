import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { OpticReadyPlateDto } from './optic-ready-plate.dto';
import { CreateWeaponDto, WeaponDto, WeaponTriggerTypeDto } from './weapon.dto';
import { ColorDto } from './color.dto';
import { MaterialDto } from './material.dto';

export class CreateHandGunDto extends CreateWeaponDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isOpticReady: boolean;

  @ApiProperty()
  @IsBoolean()
  decocking: boolean;

  @ApiProperty()
  triggerTypeId: number;

  @ApiProperty()
  slideColorId: number;

  @ApiProperty()
  slideMaterialId: number;

  @ApiProperty()
  isExternalHammer: boolean;

  @ApiProperty({
    type: [OpticReadyPlateDto],
    nullable: true,
  })
  @IsOptional()
  providedOpticReadyPlates: OpticReadyPlateDto[];

  @ApiProperty({ description: 'Rail picatiny' })
  @IsBoolean()
  isPicatinyRailSlop: boolean;
}
export class UpdateHandGunDto extends CreateHandGunDto {
  @ApiProperty()
  id: number;
}
export class HandGunDto extends WeaponDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isOpticReady: boolean;

  @ApiProperty()
  @IsBoolean()
  decocking: boolean;

  @ApiProperty({
    type: WeaponTriggerTypeDto,
  })
  triggerType: WeaponTriggerTypeDto;

  @ApiProperty({
    type: ColorDto,
  })
  slideColor: ColorDto;

  @ApiProperty({
    type: MaterialDto,
  })
  slideMaterial: MaterialDto;

  @ApiProperty()
  isExternalHammer: boolean;

  @ApiProperty({
    type: [OpticReadyPlateDto],
  })
  opticReadyPlates: OpticReadyPlateDto[];

  @ApiProperty({ description: 'Rail picatiny' })
  @IsBoolean()
  isPicatinyRailSlop: boolean;
}
