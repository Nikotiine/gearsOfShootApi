import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { StockableObject } from '../enum/stock-item.enum';
import { FactoryDto } from './factory.dto';
import { LegislationCategoryDto } from './legislation-category.dto';

class RouteParamsDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @IsOptional()
  category?: string;
}

class RouteToDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: RouteParamsDto })
  params: RouteParamsDto;
}
export class CreateClientOrderItem {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  objectId: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  object: StockableObject;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ type: RouteToDto })
  to: RouteToDto;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: FactoryDto })
  factory: FactoryDto;

  @ApiProperty()
  comment: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    type: LegislationCategoryDto,
    example: 'C',
    nullable: true,
  })
  @IsOptional()
  category?: LegislationCategoryDto;
}
