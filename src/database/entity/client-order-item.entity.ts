import { BeforeRemove, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { CustomBase } from './custom-base';
import { StockableObject } from '../../enum/stock-item.enum';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { ClientOrder } from './client-order.entity';
import { LegislationCategory } from './legislation-category.entity';
import { Factory } from './factory.entity';

@Entity()
export class ClientOrderItem extends CustomBase {
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

  @ManyToOne(() => ClientOrder, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order: ClientOrder;

  @Column()
  name: string;

  @ManyToOne(() => LegislationCategory)
  category: LegislationCategory;

  @Column()
  totalPrice: number;

  @Column()
  comment: string;

  @ManyToMany(() => Factory)
  factory: Factory;

  @Column({
    type: 'jsonb',
  })
  to: RouteToProperties;
}
export interface RouteToProperties {
  name: string;
  params: {
    id: number;
    category?: string;
  };
}
