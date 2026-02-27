import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { ClientOrderItem } from './client-order-item.entity';
import { Address } from './address.entity';
import { User } from './user.entity';
import { CustomBaseAudit } from './custom-base-audit';

@Entity()
export class ClientOrder extends CustomBaseAudit {
  @Column({ type: 'float' })
  totalPriceHt: number;

  @Column({ default: 20, type: 'float' })
  vat: number;

  @Column({ default: 0 })
  shippingCost: number;

  @Column({ default: 'IN_ORDER' })
  invoiceStatus: InvoiceOrderStatus;

  @OneToMany(() => ClientOrderItem, (item) => item.order)
  items: ClientOrderItem[];

  @Column()
  message: string;

  @ManyToOne(() => Address)
  shippingAddress: Address;

  @ManyToOne(() => Address)
  paymentAddress: Address;

  @Column({ type: 'float' })
  totalPriceTTC: number;

  @Column()
  totalItems: number;

  @Column()
  cartValidity: Date;

  @ManyToOne(() => User, (user) => user.orders)
  orderedBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy?: User;
}
