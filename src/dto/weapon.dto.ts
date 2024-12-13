import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { ThreadedSizeDto } from './threaded-size.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { PercussionTypeDto } from './percussion-type.dto';
import { WeaponMagazineDto } from './weapon-magazine.dto';
import { RailSizeDto } from './rail-size.dto';
import { MaterialDto } from './material.dto';
import { ColorDto } from './color.dto';
import { OpticReadyPlateDto } from './optic-ready-plate.dto';

export class WeaponReloadModeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class WeaponTriggerTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
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
export abstract class CreateWeaponDto {
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
    nullable: true,
    description: 'Le modele de chargeur fournis',
  })
  @IsOptional()
  providedMagazineId: number;

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
}

export abstract class WeaponDto {
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

  @ApiProperty({
    type: WeaponMagazineDto,
  })
  providedMagazine: WeaponMagazineDto;

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
    type: [MaterialDto],
  })
  buttTypes: MaterialDto[];

  @ApiProperty({
    type: [RailSizeDto],
  })
  railSizes: RailSizeDto[];

  @ApiProperty({
    type: [WeaponTriggerTypeDto],
  })
  triggerTypes: WeaponTriggerTypeDto[];

  @ApiProperty({
    type: [ColorDto],
  })
  colors: ColorDto[];

  @ApiProperty({
    type: [OpticReadyPlateDto],
  })
  opticReadyPlates: OpticReadyPlateDto[];
}
