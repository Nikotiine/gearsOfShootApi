import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RiffleDto } from './riffle.dto';
import { HandGunDto } from './hand-gun.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { WeaponTypeDto } from './weapon.dto';
import { MaterialDto } from './material.dto';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';

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

  @ApiProperty({
    description: 'matiere du chargeur',
    type: MaterialDto,
  })
  body: MaterialDto;

  @ApiProperty({
    description: 'marque du chargeur',
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    description: 'calibre des munitions du chargeur',
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({ nullable: true })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'La categorie de l arme en france',
    type: LegislationCategoryDto,
  })
  category: LegislationCategoryDto;

  @ApiProperty({
    description: 'Le type de l arme',
    type: WeaponTypeDto,
  })
  weaponType: WeaponTypeDto;

  @ApiProperty({
    type: [RiffleDto],
    nullable: true,
  })
  @IsOptional()
  compatibleRiffle: RiffleDto[];

  @ApiProperty({
    type: [HandGunDto],
    nullable: true,
  })
  @IsOptional()
  compatibleHandGun: HandGunDto[];
}
export class UpdateWeaponMagazineDto extends CreateWeaponMagazineDto {
  @ApiProperty()
  id: number;
}
