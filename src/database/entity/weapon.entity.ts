import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { LegislationCategories } from '../../enum/legislation-categories.enum';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weapon-type.entity';
import { BarrelTypes } from '../../enum/barrel-types.enum';
import { ThreadedSize } from './threaded-size.entity';
@Entity()
@Unique(['name', 'variation', 'caliber', 'factory'])
export class Weapon extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  variation: string;
  @Column({ nullable: true })
  description: string;
  @Column({ enum: LegislationCategories })
  category: LegislationCategories;
  @ManyToOne(() => Caliber, (caliber) => caliber.weapons)
  caliber: Caliber;
  @ManyToOne(() => Factory, (factory) => factory.weapons)
  factory: Factory;
  @ManyToOne(() => WeaponType, (type) => type.weapons)
  type: WeaponType;
  @Column({ nullable: true })
  barrelLength: number;
  @Column({ default: false })
  isOpticReady: boolean;
  @Column({ default: false })
  isAdjustableTrigger: boolean;
  @Column({ default: false })
  isThreadedBarrel: boolean;
  @Column({ enum: BarrelTypes, default: BarrelTypes.NORMAL })
  barrelType: BarrelTypes;
  @ManyToOne(() => ThreadedSize, (threadedSize) => threadedSize.weapons)
  threadedSize: ThreadedSize;
  @Column()
  reference: string;
}
