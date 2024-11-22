import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';

import { ThreadedSizeDto } from './threaded-size.dto';

import { LegislationCategoryDto } from './legislation-category.dto';
import { PercussionTypeDto } from './percussion-type.dto';
import { WeaponMagazineDto } from './weapon-magazine.dto';
import { RailSizeDto } from './rail-size.dto';

export class WeaponButtTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class WeaponReloadModeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class CreateWeaponTypeDto {
  @ApiProperty({
    example: 'Fusil a verrou',
  })
  name: string;
  @ApiProperty()
  modeId: number;
  @ApiProperty()
  @IsNotEmpty()
  reference: string;
}

export class UpdateWeaponTypeDto extends CreateWeaponTypeDto {
  @ApiProperty()
  id: number;
}

export class WeaponTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    example: 'Fusil a verrou',
  })
  name: string;
  @ApiProperty({
    type: WeaponReloadModeDto,
  })
  mode: WeaponReloadModeDto;
  @ApiProperty()
  @IsNotEmpty()
  reference: string;
}
export class ListOfPrerequisitesWeaponTypeDto {
  @ApiProperty({
    type: [WeaponReloadModeDto],
  })
  modes: WeaponReloadModeDto[];
}
export class WeaponBarrelTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class CreateWeaponDto {
  @ApiProperty({
    example: 'CZ 457',
  })
  name: string;

  @ApiProperty({
    example: 'Une description de l arme son histoire ...',
    nullable: true,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Varmint ou Luxe',
    nullable: true,
  })
  @IsOptional()
  variation: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  caliberId: number;

  @ApiProperty()
  factoryId: number;

  @ApiProperty()
  typeId: number;

  @ApiProperty({
    example: 51,
  })
  @IsOptional()
  barrelLength: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isOpticReady: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isAdjustableTrigger: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isThreadedBarrel: boolean;

  @ApiProperty()
  barrelTypeId: number;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  threadedSizeId: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  adjustableTriggerValue: string;

  @ApiProperty()
  percussionTypeId: number;

  @ApiProperty()
  providedMagazineQuantity: number;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  providedMagazineId: number;

  @ApiProperty()
  barrelSize: number;

  @ApiProperty({ description: 'Crosse ajustable en profondeur' })
  isAdjustableButt: boolean;

  @ApiProperty({ description: 'Busc adjutable' })
  isAdjustableBusk: boolean;

  @ApiProperty()
  buttId: number;

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
  isMlockCompatibility: boolean;

  @ApiProperty({ description: 'Rail picatiny' })
  isPicatinyRailSlop: boolean;

  @ApiProperty({ description: 'Visee ouverte ?' })
  isOpenAim: boolean;

  @ApiProperty({ description: 'Guidon reglable' })
  isAdjustableFrontSight: boolean;

  @ApiProperty({ description: 'Hausse reglable' })
  isAdjustableBackSight: boolean;
}

export class UpdateWeaponDto extends CreateWeaponDto {
  @ApiProperty()
  id: number;
}
export class WeaponDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'CZ-457-VAR-22LR',
  })
  reference: string;
  @ApiProperty({
    example: 'CZ 457',
  })
  name: string;

  @ApiProperty({
    example: 'Une description de l arme son histoire ...',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Varmint ou Luxe',
    nullable: true,
  })
  @IsOptional()
  variation: string;

  @ApiProperty({
    type: LegislationCategoryDto,
    example: 'C',
  })
  category: LegislationCategoryDto;

  @ApiProperty({
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: WeaponTypeDto,
  })
  type: WeaponTypeDto;

  @ApiProperty({
    example: 51,
  })
  barrelLength: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isOpticReady: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isAdjustableTrigger: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isThreadedBarrel: boolean;

  @ApiProperty({
    type: WeaponBarrelTypeDto,
    example: 'Lourd',
  })
  barrelType: WeaponBarrelTypeDto;

  @ApiProperty({
    type: ThreadedSizeDto,
  })
  threadedSize: ThreadedSizeDto;
  @ApiProperty()
  adjustableTriggerValue: string;

  @ApiProperty({
    type: PercussionTypeDto,
  })
  percussionType: PercussionTypeDto;

  @ApiProperty()
  providedMagazineQuantity: number;

  @ApiProperty({
    type: WeaponMagazineDto,
  })
  providedMagazine: WeaponMagazineDto;

  @ApiProperty()
  barrelSize: number;

  @ApiProperty({ description: 'Crosse ajustable en profondeur' })
  isAdjustableButt: boolean;

  @ApiProperty({ description: 'Busc adjutable' })
  isAdjustableBusk: boolean;

  @ApiProperty({
    type: WeaponButtTypeDto,
  })
  butt: WeaponButtTypeDto;

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

  @ApiProperty({ description: 'Rail picatiny' })
  isPicatinyRailSlop: boolean;

  @ApiProperty({ description: 'Visee ouverte ?' })
  isOpenAim: boolean;

  @ApiProperty({ description: 'Guidon reglable' })
  isAdjustableFrontSight: boolean;

  @ApiProperty({ description: 'Hausse reglable' })
  isAdjustableBackSight: boolean;
}
export class ListOfPrerequisitesWeaponDto {
  @ApiProperty({
    type: [CaliberDto],
  })
  calibers: CaliberDto[];
  @ApiProperty({
    type: [FactoryDto],
  })
  factories: FactoryDto[];

  @ApiProperty({
    type: [WeaponTypeDto],
  })
  types: WeaponTypeDto[];

  @ApiProperty({
    type: [ThreadedSizeDto],
  })
  threadedSizes: ThreadedSizeDto[];

  @ApiProperty({
    type: [PercussionTypeDto],
  })
  percussionTypes: PercussionTypeDto[];

  @ApiProperty({
    type: [LegislationCategoryDto],
  })
  categories: LegislationCategoryDto[];

  @ApiProperty({
    type: [WeaponBarrelTypeDto],
  })
  barreTypes: WeaponBarrelTypeDto[];

  @ApiProperty({
    type: [WeaponButtTypeDto],
  })
  buttTypes: WeaponButtTypeDto[];

  @ApiProperty({
    type: [RailSizeDto],
  })
  railSizes: RailSizeDto[];
}
