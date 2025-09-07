import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { StockableObject } from '../../enum/stock-item.enum';
import { InvoiceSupplier } from './invoice-supplier.entity';
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
  accountHR: number;

  @Column()
  internalInvoiceReference: string;

  @Column()
  comment: string;

  @ManyToOne(() => InvoiceSupplier, (invoice) => invoice.items)
  invoice: InvoiceSupplier;
}
