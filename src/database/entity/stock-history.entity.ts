import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Stock } from './stock.entity';
import { MovementType } from '../../enum/stock-item.enum';
@Entity()
export class StockHistory extends BaseEntity {
  @ManyToOne(() => Stock, (stock) => stock.histories)
  stock: Stock;

  @Column()
  movement: MovementType;

  @Column()
  movementQuantity: number;

  @Column()
  previousQuantity: number;

  @Column()
  newQuantity: number;

  @Column({ nullable: true })
  reason: string;
}
