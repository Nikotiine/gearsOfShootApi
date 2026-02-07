import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StockableObject } from '../../enum/stock-item.enum';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { ClientOrder } from './client-order.entity';

@Entity()
export class ClientOrderItemEntity extends BaseEntity {
  @Column({ enum: StockableObject })
  object: StockableObject;

  @Column()
  objectId: number;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  unitPriceHT: number;

  @Column()
  totalPriceHT: number;

  @Column({ default: 'IN_ORDER' })
  status: InvoiceOrderStatus;

  @ManyToOne(() => ClientOrder, (order) => order.items)
  orders: ClientOrder;
}
