import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LegislationCategories } from '../../enum/legislationCategories.enum';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weaponType.entity';
import { BarrelTypes } from '../../enum/barrelTypes.enum';
import { ThreadedSize } from './threadedSize.entity';
@Entity()
export class Weapon extends BaseEntity {
  @Column()
  name: string;
  @Column()
  variation: string;
  @Column()
  description: string;
  @Column({ enum: LegislationCategories })
  category: LegislationCategories;
  @ManyToOne(() => Caliber, (caliber) => caliber.weapons)
  caliber: Caliber;
  @ManyToOne(() => Factory, (factory) => factory.weapons)
  factory: Factory;
  @ManyToOne(() => WeaponType, (type) => type.weapons)
  type: WeaponType;
  @Column()
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
}
