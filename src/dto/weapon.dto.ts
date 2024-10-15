import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { LegislationCategories } from '../enum/legislation-categories.enum';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { BarrelTypes } from '../enum/barrel-types.enum';

import { ThreadedSize } from '../database/entity/threaded-size.entity';
import { ThreadedSizeDto } from './threaded-size.dto';
export class CreateWeaponTypeDto {
  @ApiProperty({
    example: 'Fusil a verrou',
  })
  name: string;
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
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Varmint ou Luxe',
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
    type: ThreadedSizeDto,
  })
  threadedSize: ThreadedSize;
}
export class WeaponDto extends CreateWeaponDto {
  @ApiProperty()
  id: number;
}
