import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { CustomBaseAudit } from './custom-base-audit';
import { Supplier } from './supplier.entity';
import { User } from './user.entity';

@Entity()
export class PriceHistory extends CustomBaseAudit {
  @Column({ type: 'float' })
  supplierPrice: number;

  @Column({ nullable: true, type: 'float' })
  recommendedSalePrice: number;

  @Column({ nullable: true, type: 'float' })
  currentSalePrice: number;

  @Column({ nullable: true, type: 'float' })
  precentOfDiscount: number;

  @Column({ nullable: true, type: 'float' })
  discountedPrice: number;

  @Column({ default: false })
  isDiscounted: boolean;

  @Column()
  objectId: number;

  @Column({ nullable: false, enum: PriceableObjectType })
  object: PriceableObjectType;

  @ManyToOne(() => Supplier, (supplier) => supplier.priceHistories)
  supplier: Supplier;

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
