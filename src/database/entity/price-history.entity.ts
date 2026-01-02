import { Column, Entity, ManyToOne } from 'typeorm';

import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { BaseAuditEntity } from './base-audit.entity';
import { Supplier } from './supplier.entity';

@Entity()
export class PriceHistory extends BaseAuditEntity {
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
}
