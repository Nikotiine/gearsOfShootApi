import { ApiProperty } from '@nestjs/swagger';

import { RailSizeDto } from './rail-size.dto';
import { FactoryDto } from './factory.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePriceHistoryDto } from './price-history.dto';
import { UserDto } from './user.dto';
import { StockDto } from './stock.dto';

export class CreateOpticCollarDto {
  @ApiProperty()
  @IsNumber()
  diameter: number;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty({
    type: RailSizeDto,
  })
  railSize: RailSizeDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Une description du ou des colliers',
  })
  description: string;

  @ApiProperty({
    type: CreatePriceHistoryDto,
  })
  priceHistory: CreatePriceHistoryDto;

  @ApiProperty()
  inStock: number;
}

export class UpdateOpticCollarDto extends CreateOpticCollarDto {
  @ApiProperty()
  id: number;
}
export class OpticCollarDto extends UpdateOpticCollarDto {
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
