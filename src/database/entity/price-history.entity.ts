import { Column, Entity, ManyToOne } from 'typeorm';

import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { BaseAuditEntity } from './base-audit.entity';
import { Supplier } from './supplier.entity';

@Entity()
export class PriceHistory extends BaseAuditEntity {
  @Column()
  supplierPrice: number;

  @Column({ nullable: true })
  recommendedSalePrice: number;

  @Column({ nullable: true })
  currentSalePrice: number;

  @Column()
  objectId: number;

  @Column({ nullable: false, enum: PriceableObjectType })
  object: PriceableObjectType;

  @ManyToOne(() => Supplier, (supplier) => supplier.priceHistories)
  supplier: Supplier;
}
