import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

import { PriceableObjectType } from '../../enum/PriceableObjectType.enum';
@Entity()
export class PriceHistory extends BaseEntity {
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
}
