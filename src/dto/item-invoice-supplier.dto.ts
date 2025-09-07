import { ApiProperty } from '@nestjs/swagger';
import { StockableObject } from '../enum/stock-item.enum';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ItemInvoiceSupplierDto {
  @ApiProperty()
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
  accountHR: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
