import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PriceHistory } from './price-history.entity';
import { InvoiceSupplier } from './invoice-supplier.entity';

@Entity()
export class Supplier extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  address: string;
  @Column()
  phoneNumber: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column()
  zipCode: string;
  @Column()
  siret: string;
  @OneToMany(() => PriceHistory, (price) => price.supplier)
  priceHistories: PriceHistory[];
  @OneToMany(() => InvoiceSupplier, (invoice) => invoice.supplier)
  invoices: InvoiceSupplier[];
}
