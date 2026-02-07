import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseAuditEntity } from './base-audit.entity';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { ClientOrderItemEntity } from './client-order-item.entity';
import { Address } from './address.entity';
import { User } from './user.entity';

@Entity()
export class ClientOrder extends BaseAuditEntity {
  @Column()
  totalPriceHt: number;

  // TVA
  @Column({ default: 20 })
  vat: number;

  @Column({ default: 0 })
  shippingCost: number;

  @Column({ default: 'IN_ORDER' })
  invoiceStatus: InvoiceOrderStatus;

  @OneToMany(() => ClientOrderItemEntity, (item) => item.orders)
  items: ClientOrderItemEntity[];

  @Column()
  message: string;

  @ManyToOne(() => Address)
  shippingAddress: Address;

  @ManyToOne(() => User)
  client: User;

  @Column()
  totalPriceTTC: number;

  @Column()
  totalItems: number;
}
