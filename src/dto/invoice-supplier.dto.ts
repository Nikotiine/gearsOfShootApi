import { ApiProperty } from '@nestjs/swagger';
import { SupplierDto } from './supplier.dto';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from './item-invoice-supplier.dto';
import { IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateInvoiceSupplierDto {
  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty({
    type: SupplierDto,
  })
  supplier: SupplierDto;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  vat: number;

  @ApiProperty({
    type: [CreateItemInvoiceSupplierDto],
  })
  items: CreateItemInvoiceSupplierDto[];
  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  invoiceSupplierReference?: string;
}
export class UpdateInvoiceSupplierDto extends CreateInvoiceSupplierDto {
  @ApiProperty()
  id: number;
}
export class InvoiceSupplierDto {
  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty({
    type: SupplierDto,
  })
  supplier: SupplierDto;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdBy: UserDto;

  @ApiProperty()
  id: number;

  @ApiProperty()
  internalInvoiceReference: string;

  @ApiProperty()
  invoiceSupplierReference: string;

  @ApiProperty({
    type: [ItemInvoice],
  })
  items: ItemInvoice[];
}
