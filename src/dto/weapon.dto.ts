import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { LegislationCategories } from '../enum/legislation-categories.enum';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { BarrelTypes } from '../enum/barrel-types.enum';
import { ThreadedSizeDto } from './threaded-size.dto';
import { WeaponReloadMode } from '../enum/weapon-type-main-category.enum';

export class CreateWeaponTypeDto {
  @ApiProperty({
    example: 'Fusil a verrou',
  })
  name: string;
  @ApiProperty({
    enum: WeaponReloadMode,
  })
  mode: WeaponReloadMode;
  @ApiProperty()
  @IsNotEmpty()
  ref: string;
}

export class WeaponTypeDto extends CreateWeaponTypeDto {
  @ApiProperty()
  id: number;
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

  @ApiProperty({
    enum: LegislationCategories,
    example: LegislationCategories.C,
  })
  category: LegislationCategories;

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

  @ApiProperty({
    enum: BarrelTypes,
    example: BarrelTypes.HEAVY,
  })
  barrelType: BarrelTypes;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  threadedSizeId: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  adjustableTriggerValue: string;
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
    enum: LegislationCategories,
    example: LegislationCategories.C,
  })
  category: LegislationCategories;

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
    enum: BarrelTypes,
    example: BarrelTypes.HEAVY,
  })
  barrelType: BarrelTypes;

  @ApiProperty({
    type: ThreadedSizeDto,
  })
  threadedSize: ThreadedSizeDto;
  @ApiProperty()
  adjustableTriggerValue: string;
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
}
