import { ApiProperty } from '@nestjs/swagger';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';

import { MaterialDto } from './material.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { RiffleDto } from './riffle.dto';
import { HandGunDto } from './hand-gun.dto';
import { WeaponTypeDto } from './weapon.dto';
import { IsOptional } from 'class-validator';
import { CreatePriceHistoryDto } from './price-history.dto';
import { UserDto } from './user.dto';
import { StockDto } from './stock.dto';

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

  @ApiProperty({
    type: CreatePriceHistoryDto,
    description: 'Historique des prix',
  })
  priceHistory: CreatePriceHistoryDto;

  @ApiProperty()
  inStock: number;
}
export class UpdateWeaponMagazineDto extends CreateWeaponMagazineDto {
  @ApiProperty()
  id: number;
}
export class WeaponMagazineDto extends UpdateWeaponMagazineDto {
  @ApiProperty()
  reference: string;

  @ApiProperty({
    type: UserDto,
  })
  createdBy: UserDto;

  @ApiProperty({
    type: UserDto,
  })
  updatedBy: UserDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    nullable: true,
    type: StockDto,
  })
  @IsOptional()
  stock?: StockDto;

  @ApiProperty()
  isDiscounted: boolean;
}
