import { Column, Entity, OneToMany } from 'typeorm';
import { BaseAuditEntity } from './base-audit.entity';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { ClientOrderItemEntity } from './client-order-item.entity';

@Entity()
export class ClientOrderEntity extends BaseAuditEntity {
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
}
