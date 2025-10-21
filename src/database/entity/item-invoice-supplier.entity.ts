import { Column, Entity, ManyToOne } from 'typeorm';
import { StockableObject } from '../../enum/stock-item.enum';
import { InvoiceSupplier } from './invoice-supplier.entity';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { BaseEntity } from './base.entity';
@Entity()
export class ItemInvoiceSupplier extends BaseEntity {
  @Column({ enum: StockableObject })
  object: StockableObject;

  @Column()
  objectId: number;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  supplierPriceHT: number;

  @Column()
  totalPriceHT: number;

  @Column()
  accountHT: number;

  @Column()
  internalInvoiceReference: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => InvoiceSupplier, (invoice) => invoice.items)
  invoice: InvoiceSupplier;

  @Column({ default: 'IN_ORDER' })
  status: InvoiceOrderStatus;

  @Column({ nullable: true })
  shipmentNumber: string;
}
