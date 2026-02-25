import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Factory } from './factory.entity';
import { Caliber } from './caliber.entity';
import { AmmunitionHeadType } from './ammunition-head-type.entity';
import { AmmunitionBodyType } from './ammunition-body-type.entity';
import { LegislationCategory } from './legislation-category.entity';
import { PercussionType } from './percussion-type.entity';
import { BaseAuditEntityWithSaleOptions } from './custom-base-audit';
import { User } from './user.entity';

@Entity()
@Unique(['name', 'factory', 'packaging'])
export class Ammunition extends BaseAuditEntityWithSaleOptions {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => LegislationCategory, (category) => category.ammuntions)
  category: LegislationCategory;

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

  @ManyToOne(() => PercussionType, (category) => category.ammuntions)
  percussionType: PercussionType;

  @Column()
  packaging: number;

  @Column()
  reference: string;

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
