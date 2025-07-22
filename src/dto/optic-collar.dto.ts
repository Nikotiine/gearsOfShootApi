import { ApiProperty } from '@nestjs/swagger';

import { RailSizeDto } from './rail-size.dto';
import { FactoryDto } from './factory.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePriceHistoryDto } from './price-history.dto';

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
}

export class UpdateOpticCollarDto extends CreateOpticCollarDto {
  @ApiProperty()
  id: number;
}
export class OpticCollarDto extends UpdateOpticCollarDto {
  @ApiProperty()
  reference: string;
}
