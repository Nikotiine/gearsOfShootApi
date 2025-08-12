import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';
import { LegislationCategoryDto } from './legislation-category.dto';
import { PercussionTypeDto } from './percussion-type.dto';
import { CreatePriceHistoryDto } from './price-history.dto';
import { StockDto } from './stock.dto';

export class CreateAmmunitionBodyTypeDto {
  @ApiProperty({
    example: 'Laiton',
  })
  name: string;
  @ApiProperty()
  reference: string;
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
  @ApiProperty()
  reference: string;
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
    nullable: true,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: LegislationCategoryDto,
    example: 'C',
  })
  category: LegislationCategoryDto;

  @ApiProperty({
    example: 320,
  })
  @IsNumber()
  initialSpeed: number;

  @ApiProperty({
    type: PercussionTypeDto,
  })
  percussionType: PercussionTypeDto;

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
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: CreatePriceHistoryDto,
  })
  priceHistory: CreatePriceHistoryDto;

  @ApiProperty()
  inStock: number;
}
export class UpdateAmmunitionDto extends CreateAmmunitionDto {
  @ApiProperty()
  id: number;
}

export class AmmunitionDto extends UpdateAmmunitionDto {
  @ApiProperty()
  reference: string;

  @ApiProperty({
    nullable: true,
    type: StockDto,
  })
  @IsOptional()
  stock?: StockDto;
}
