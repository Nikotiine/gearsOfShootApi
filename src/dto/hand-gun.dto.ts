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
import { WeaponMagazineDto } from './weapon-magazine.dto';

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
  })
  categoryId: number;

  @ApiProperty({
    description: 'Le calibre de l arme',
  })
  caliberId: number;

  @ApiProperty({
    description: 'la marque',
  })
  factoryId: number;

  @ApiProperty({
    description: 'Type d arme',
    example: 'Fusil a verrou',
  })
  typeId: number;

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
  })
  barrelTypeId: number;

  @ApiProperty({
    nullable: true,
    description: 'Les dimmension du filletage',
  })
  @IsOptional()
  threadedSizeId: number;

  @ApiProperty({
    nullable: true,
    description: 'les valeurs de poids depart de la detente',
    example: 'Entre 1 et 2kg',
  })
  @IsOptional()
  adjustableTriggerValue: string;

  @ApiProperty({
    description: 'Le type de percussion ( annulaire ou centrale )',
  })
  percussionTypeId: number;

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
  })
  @IsOptional()
  buttMaterialId: number;

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
  })
  @IsOptional()
  buttColorId: number;

  @ApiProperty({
    description: 'la couleur du canon ',
    nullable: true,
  })
  @IsOptional()
  barrelColorId: number;
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isOpticReady: boolean;

  @ApiProperty()
  @IsBoolean()
  decocking: boolean;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  triggerTypeId: number;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  slideColorId: number;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
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
export class HandGunDto {
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

  @ApiProperty()
  barrelSize: number;

  @ApiProperty({
    type: MaterialDto,
  })
  buttMaterial: MaterialDto;

  @ApiProperty({ description: 'Guidon reglable' })
  isAdjustableFrontSight: boolean;

  @ApiProperty({ description: 'Hausse reglable' })
  isAdjustableBackSight: boolean;

  @ApiProperty({
    type: ColorDto,
  })
  buttColor: ColorDto;

  @ApiProperty({
    type: ColorDto,
  })
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
