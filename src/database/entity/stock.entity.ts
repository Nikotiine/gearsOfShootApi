import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { StockableObject } from '../../enum/stock-item.enum';
import { StockHistory } from './stock-history.entity';
@Entity()
export class Stock extends BaseEntity {
  @Column({ enum: StockableObject })
  object: StockableObject;

  @Column()
  objectId: number;

  @Column({ default: 0 })
  quantity: number;

  @OneToMany(() => StockHistory, (stockHistory) => stockHistory.stock)
  histories: StockHistory[];
}
