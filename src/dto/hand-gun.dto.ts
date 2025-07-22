import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { OpticReadyPlateDto } from './optic-ready-plate.dto';
import {
  WeaponBarrelTypeDto,
  WeaponTriggerTypeDto,
  WeaponTypeDto,
} from './weapon.dto';
import { ColorDto } from './color.dto';
import { MaterialDto } from './material.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { ThreadedSizeDto } from './threaded-size.dto';
import { PercussionTypeDto } from './percussion-type.dto';
import { CreatePriceHistoryDto } from './price-history.dto';

export class CreateHandGunDto {
  @ApiProperty({
    example: 'CZ 457',
    description: 'Nom du model de l arme',
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
    description: 'Variante du modele',
  })
  @IsOptional()
  variation: string;

  @ApiProperty({
    description: 'La categorie de l arme en france',
    type: LegislationCategoryDto,
  })
  category: LegislationCategoryDto;

  @ApiProperty({
    description: 'Le calibre de l arme',
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({
    description: 'la marque',
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    description: 'Type d arme',
    example: 'Fusil a verrou',
    type: WeaponTypeDto,
  })
  type: WeaponTypeDto;

  @ApiProperty({
    example: 51,
    description: 'La longueur du canon en cm',
  })
  @IsOptional()
  barrelLength: number;

  @ApiProperty({
    example: false,
    description: 'Si le poid de depart de la detente est reglable',
  })
  @IsBoolean()
  isAdjustableTrigger: boolean;

  @ApiProperty({
    example: false,
    description: 'Si le canon est fillete',
  })
  @IsBoolean()
  isThreadedBarrel: boolean;

  @ApiProperty({
    description: 'Le type de canon (lourd/leger...)',
    type: WeaponBarrelTypeDto,
  })
  barrelType: WeaponBarrelTypeDto;

  @ApiProperty({
    nullable: true,
    description: 'Les dimmension du filletage',
    type: ThreadedSizeDto,
  })
  @IsOptional()
  threadedSize: ThreadedSizeDto;

  @ApiProperty({
    nullable: true,
    description: 'les valeurs de poids depart de la detente',
    example: 'Entre 1 et 2kg',
  })
  @IsOptional()
  adjustableTriggerMinWeight: number;

  @ApiProperty({
    nullable: true,
    description: 'les valeurs de poids depart de la detente',
    example: 'Entre 1 et 2kg',
  })
  @IsOptional()
  adjustableTriggerMaxWeight: number;

  @ApiProperty({
    description: 'Le type de percussion ( annulaire ou centrale )',
    type: PercussionTypeDto,
  })
  percussionType: PercussionTypeDto;

  @ApiProperty({
    example: 1,
    description: 'Le nombre de chargeur fournis',
  })
  providedMagazineQuantity: number;

  @ApiProperty({
    example: 18,
    description: "L'epaisseur exterieur du canon",
  })
  barrelSize: number;

  @ApiProperty({
    description: 'La matiere de la crosse ou caracasse',
    nullable: true,
    type: MaterialDto,
  })
  @IsOptional()
  buttMaterial: MaterialDto;

  @ApiProperty({
    description: 'Guidon reglable',
  })
  @IsBoolean()
  isAdjustableFrontSight: boolean;

  @ApiProperty({
    description: 'Hausse reglable',
  })
  @IsBoolean()
  isAdjustableBackSight: boolean;

  @ApiProperty({
    description: 'la couleur de la crosse',
    nullable: true,
    type: ColorDto,
  })
  @IsOptional()
  buttColor: ColorDto;

  @ApiProperty({
    description: 'la couleur du canon ',
    nullable: true,
    type: ColorDto,
  })
  @IsOptional()
  barrelColor: ColorDto;

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
  @IsOptional()
  triggerType: WeaponTriggerTypeDto;

  @ApiProperty({
    nullable: true,
    type: ColorDto,
  })
  @IsOptional()
  slideColor: ColorDto;

  @ApiProperty({
    nullable: true,
    type: MaterialDto,
  })
  @IsOptional()
  slideMaterial: MaterialDto;

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

  @ApiProperty({
    type: CreatePriceHistoryDto,
  })
  priceHistory: CreatePriceHistoryDto;
}
export class UpdateHandGunDto extends CreateHandGunDto {
  @ApiProperty()
  id: number;
}
export class HandGunDto extends UpdateHandGunDto {
  @ApiProperty({
    example: 'CZ-457-VAR-22LR',
  })
  reference: string;
}
