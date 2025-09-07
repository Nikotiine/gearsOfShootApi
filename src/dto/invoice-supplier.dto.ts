import { ApiProperty } from '@nestjs/swagger';
import { SupplierDto } from './supplier.dto';
import { ItemInvoiceSupplierDto } from './item-invoice-supplier.dto';

export class InvoiceSupplierDto {
  @ApiProperty()
  comment: string;

  @ApiProperty({
    type: SupplierDto,
  })
  supplier: SupplierDto;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  supplierPriceHT: number;

  @ApiProperty({
    type: [ItemInvoiceSupplierDto],
  })
  items: ItemInvoiceSupplierDto[];
}
