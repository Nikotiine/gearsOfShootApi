import { ApiProperty } from '@nestjs/swagger';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';
import { IsOptional } from 'class-validator';
import { MaterialDto } from './material.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { RiffleDto } from './riffle.dto';

export class CreateWeaponMagazineDto {
  @ApiProperty({
    description: 'Capacite en munition',
  })
  capacity: number;

  @ApiProperty({
    description: 'longeur du chargeur',
  })
  length: number;

  @ApiProperty({
    description: 'hauteur du chargeur',
  })
  height: number;

  @ApiProperty({
    description: 'largeur du chargeur',
  })
  width: number;

  @ApiProperty()
  reference: string;

  @ApiProperty({
    description: 'matiere du chargeur',
  })
  bodyId: number;

  @ApiProperty({
    description: 'marque du chargeur',
  })
  factoryId: number;

  @ApiProperty({
    description: 'calibre des munitions du chargeur',
  })
  caliberId: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'La categorie de l arme en france',
  })
  categoryId: number;
}
export class UpdateWeaponMagazineDto extends CreateWeaponMagazineDto {
  @ApiProperty()
  id: number;
}
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
export class ListOfPrerequisitesWeaponMagazineDto {
  @ApiProperty({
    type: [CaliberDto],
  })
  calibers: CaliberDto[];
  @ApiProperty({
    type: [FactoryDto],
  })
  factories: FactoryDto[];
  @ApiProperty({
    type: [MaterialDto],
  })
  bodies: MaterialDto[];
  @ApiProperty({
    type: [LegislationCategoryDto],
  })
  categories: LegislationCategoryDto[];
}
