import { ApiProperty } from '@nestjs/swagger';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';

import { MaterialDto } from './material.dto';
import { LegislationCategoryDto } from './legislation-category.dto';

export class WeaponMagazineDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  length: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  reference: string;

  @ApiProperty({
    type: MaterialDto,
  })
  body: MaterialDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({
    type: LegislationCategoryDto,
    example: 'C',
  })
  category: LegislationCategoryDto;
}
