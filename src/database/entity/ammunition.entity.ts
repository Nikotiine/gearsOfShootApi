import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LegislationCategories } from '../../enum/legislationCategories.enum';
import { Factory } from './factory.entity';
import { Caliber } from './caliber.entity';
import { AmmunitionHeadType } from './ammunition-head-type.entity';
import { AmmunitionBodyType } from './ammunition-body-type.entity';
import { PercussionType } from '../../enum/percussionTypes.enum';

@Entity()
export class Ammunition extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ enum: LegislationCategories })
  category: LegislationCategories;
  @ManyToOne(() => Factory, (factory) => factory.ammunitions)
  factory: Factory;
  @ManyToOne(() => Caliber, (caliber) => caliber.ammunitions)
  caliber: Caliber;
  @Column()
  initialSpeed: number;
  @ManyToOne(() => AmmunitionHeadType, (headType) => headType.ammunitions)
  headType: AmmunitionHeadType;
  @ManyToOne(() => AmmunitionBodyType, (bodyType) => bodyType.ammunitions)
  bodyType: AmmunitionBodyType;
  @Column({ enum: PercussionType })
  percussionType: PercussionType;
  @Column()
  packaging: number;
}
