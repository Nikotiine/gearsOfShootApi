import { ApiProperty } from '@nestjs/swagger';
import { StockableObject } from '../enum/stock-item.enum';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { InvoiceOrderStatus } from '../types/invoice-order-status.type';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { LegislationCategoryDto } from './legislation-category.dto';

export class CreateItemInvoiceSupplierDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  object: StockableObject;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  objectId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  accountHT: number;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  supplierPriceHT: number;

  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  id?: number;
}

export class ItemInvoice {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  reference: string;

  @ApiProperty()
  unitPriceHt: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalPriceHT: number;

  @ApiProperty({
    nullable: true,
    type: CaliberDto,
  })
  @IsOptional()
  caliber?: CaliberDto;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  colors?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: LegislationCategoryDto,
    example: 'C',
    nullable: true,
  })
  @IsOptional()
  category?: LegislationCategoryDto;
}

export class UpdateItemStatusDto {
  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;
}
export class UpdateBulkItemStatusDto {
  @ApiProperty()
  @IsString()
  ids: number[];
  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;
}
