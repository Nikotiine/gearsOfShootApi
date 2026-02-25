import { BaseFilter } from '../../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { InvoiceOrderStatus } from '../../../types/invoice-order-status.type';

export class ClientOrderFilter extends BaseFilter {
  @ApiPropertyOptional({ description: 'Le nom du rds' })
  @IsOptional()
  invoiceStatus: InvoiceOrderStatus;
}
