import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weapon-type.entity';
import { ThreadedSize } from './threaded-size.entity';
import { LegislationCategory } from './legislation-category.entity';
import { PercussionType } from './percussion-type.entity';
import { WeaponBarrelType } from './weapon-barrel-type.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
@Entity()
@Unique(['name', 'variation', 'caliber', 'factory'])
export class Weapon extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  variation: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => LegislationCategory, (category) => category.weapons)
  category: LegislationCategory;

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

  @ManyToOne(() => WeaponBarrelType, (barrel) => barrel.weapons)
  barrelType: WeaponBarrelType;

  @ManyToOne(() => ThreadedSize, (threadedSize) => threadedSize.weapons, {
    nullable: true,
  })
  @JoinColumn({ name: 'threadedSizeId' })
  threadedSize?: ThreadedSize | null;

  @Column()
  reference: string;

  @Column({ nullable: true })
  adjustableTriggerValue: string;

  @ManyToOne(() => PercussionType, (type) => type.weapons)
  percussionType: PercussionType;

  @ManyToMany(() => WeaponMagazine, (mag) => mag.compatiblesWeapons, {
    cascade: ['insert'],
  })
  compatiblesMagazines: WeaponMagazine[];

  @ManyToOne(() => WeaponMagazine, (mag) => mag.weapon)
  providedMagazine: WeaponMagazine;

  @Column()
  providedMagazineQuantity: number;
}
