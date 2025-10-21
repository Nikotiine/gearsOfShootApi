import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseAuditEntity } from './base-audit.entity';
import { Supplier } from './supplier.entity';
import { ItemInvoiceSupplier } from './item-invoice-supplier.entity';

@Entity()
export class InvoiceSupplier extends BaseAuditEntity {
  @Column()
  totalPriceHt: number;

  @Column()
  internalInvoiceReference: string;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.invoices)
  supplier: Supplier;

  @Column()
  totalInvoiceItems: number;

  @Column()
  dueDate: Date;

  @Column({ default: 0 })
  totalAccountHT: number;

  @OneToMany(() => ItemInvoiceSupplier, (item) => item.invoice)
  items: ItemInvoiceSupplier[];

  // TVA
  @Column({ default: 20 })
  vat: number;

  @Column({ default: 0 })
  shippingCost: number;

  @Column({ nullable: true })
  invoiceSupplierReference: string;
}
