import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { LegislationCategories } from '../enum/legislation-categories.enum';
import { PercussionType } from '../enum/percussion-types.enum';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';

export class CreateAmmunitionBodyTypeDto {
  @ApiProperty({
    example: 'Laiton',
  })
  name: string;
}
export class AmmunitionBodyTypeDto extends CreateAmmunitionBodyTypeDto {
  @ApiProperty()
  id: number;
}
export class CreateAmmunitionHeadTypeDto {
  @ApiProperty({
    example: 'Full metal jacket',
  })
  name: string;
}
export class AmmunitionHeadTypeDto extends CreateAmmunitionHeadTypeDto {
  @ApiProperty()
  id: number;
}
export class CreateAmmunitionDto {
  @ApiProperty({
    example: 'Sk Standard',
  })
  name: string;

  @ApiProperty({
    example:
      'Une description de la munition, qualite / origine / conseil d utilisation',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    enum: LegislationCategories,
    example: LegislationCategories.C,
  })
  category: LegislationCategories;

  @ApiProperty({
    example: 320,
  })
  @IsNumber()
  initialSpeed: number;

  @ApiProperty({
    enum: PercussionType,
    example: PercussionType.CENTRAL,
  })
  percussionType: PercussionType;

  @ApiProperty({
    example: 50,
  })
  @IsPositive()
  @IsNumber()
  packaging: number;

  @ApiProperty({
    type: AmmunitionHeadTypeDto,
  })
  headType: AmmunitionHeadTypeDto;

  @ApiProperty({
    type: AmmunitionBodyTypeDto,
  })
  bodyType: AmmunitionBodyTypeDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: CaliberDto,
  })
  caliber: CaliberDto;
}

export class AmmunitionDto extends CreateAmmunitionDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  reference: string;
}

export class ListOfPrerequisitesAmmunitionDto {
  @ApiProperty({
    type: [CaliberDto],
  })
  calibers: CaliberDto[];
  @ApiProperty({
    type: [FactoryDto],
  })
  factories: FactoryDto[];
  @ApiProperty({
    type: [AmmunitionHeadTypeDto],
  })
  headTypes: AmmunitionHeadTypeDto[];
  @ApiProperty({
    type: [AmmunitionBodyTypeDto],
  })
  bodyTypes: AmmunitionBodyTypeDto[];
}
