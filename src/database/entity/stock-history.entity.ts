import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Stock } from './stock.entity';
import { MovementType } from '../../enum/stock-item.enum';
import { CustomBaseAudit } from './custom-base-audit';
import { User } from './user.entity';

@Entity()
export class StockHistory extends CustomBaseAudit {
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

  @Column({ nullable: true })
  cartValidity: Date;

  @Column({ nullable: true })
  orderId: number;

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
