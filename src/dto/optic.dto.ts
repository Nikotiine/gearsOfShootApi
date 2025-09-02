import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FactoryDto } from './factory.dto';
import { CreatePriceHistoryDto } from './price-history.dto';
import { RailSizeDto } from './rail-size.dto';
import { UserDto } from './user.dto';
import { StockDto } from './stock.dto';

export class FocalPlaneDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class OpticUnitDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class CreateOpticTypeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
}

export class OpticTypeDto extends CreateOpticTypeDto {
  @ApiProperty()
  id: number;
}

export class CreateOpticDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    example: 'Une description de l optique ...',
    nullable: true,
  })
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  maxZoom: number;

  @ApiProperty()
  @IsNumber()
  minZoom: number;

  @ApiProperty()
  @IsNumber()
  maxDrift: number;

  @ApiProperty()
  @IsNumber()
  maxElevation: number;

  @ApiProperty()
  @IsNumber()
  valueOfOneClick: number;

  @ApiProperty()
  @IsNumber()
  bodyDiameter: number;

  @ApiProperty()
  @IsNumber()
  lensDiameter: number;

  @ApiProperty()
  @IsNumber()
  minParallax: number;

  @ApiProperty()
  @IsNumber()
  maxParallax: number;

  @ApiProperty()
  @IsBoolean()
  isParallax: boolean;

  @ApiProperty({
    type: OpticUnitDto,
  })
  opticUnit: OpticUnitDto;

  @ApiProperty({
    type: FocalPlaneDto,
  })
  focalPlane: FocalPlaneDto;

  @ApiProperty({
    type: OpticTypeDto,
  })
  opticType: OpticTypeDto;

  @ApiProperty()
  @IsNumber()
  length: number;

  @ApiProperty()
  @IsNumber()
  eyeRelief: number;

  @ApiProperty()
  @IsBoolean()
  isCollarsProvided: boolean;

  @ApiProperty({
    type: CreatePriceHistoryDto,
  })
  priceHistory: CreatePriceHistoryDto;

  @ApiProperty({
    type: RailSizeDto,
    nullable: true,
  })
  @IsOptional()
  providedOpticCollarSize: RailSizeDto;

  @ApiProperty()
  inStock: number;
}

export class UpdateOpticDto extends CreateOpticDto {
  @ApiProperty()
  id: number;
}

export class OpticDto extends UpdateOpticDto {
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
  reference: string;
}
