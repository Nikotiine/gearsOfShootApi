import { Column, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from './base-audit.entity';
import { LegislationCategory } from './legislation-category.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weapon-type.entity';
import { WeaponBarrelType } from './weapon-barrel-type.entity';
import { ThreadedSize } from './threaded-size.entity';
import { PercussionType } from './percussion-type.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { Material } from './material.entity';

export abstract class WeaponBase extends BaseAuditEntity {
  // =======================
  // Identification
  // =======================
  @Column()
  name: string;

  @Column({ nullable: true })
  variation?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  reference: string;

  // =======================
  // Classification
  // =======================
  @ManyToOne(() => LegislationCategory, { nullable: false })
  category: LegislationCategory;

  @ManyToOne(() => Caliber, { nullable: false })
  caliber: Caliber;

  @ManyToOne(() => Factory, { nullable: false })
  factory: Factory;

  @ManyToOne(() => WeaponType, { nullable: false })
  type: WeaponType;

  // =======================
  // Canon & mécanique
  // =======================
  @Column({ nullable: true })
  barrelLength?: number;

  @Column()
  barrelSize: number;

  @ManyToOne(() => WeaponBarrelType)
  barrelType: WeaponBarrelType;

  @Column({ default: false })
  isThreadedBarrel: boolean;

  @ManyToOne(() => ThreadedSize, { nullable: true })
  @JoinColumn({ name: 'threadedSizeId' })
  threadedSize?: ThreadedSize | null;

  // =======================
  // Détente
  // =======================
  @Column({ default: false })
  isAdjustableTrigger: boolean;

  @Column({ nullable: true })
  adjustableTriggerMinWeight?: number;

  @Column({ nullable: true })
  adjustableTriggerMaxWeight?: number;

  // =======================
  // Percussion
  // =======================
  @ManyToOne(() => PercussionType)
  percussionType: PercussionType;

  // =======================
  // Chargeurs
  // =======================
  @ManyToMany(() => WeaponMagazine, { cascade: ['insert'] })
  compatiblesMagazines: WeaponMagazine[];

  @Column({ default: 1 })
  providedMagazineQuantity: number;

  // =======================
  // Crosse / carcasse
  // =======================
  @ManyToOne(() => Material)
  buttMaterial: Material;

  // =======================
  // Organes de visée
  // =======================
  @Column({ default: false })
  isAdjustableFrontSight: boolean;

  @Column({ default: false })
  isAdjustableBackSight: boolean;
}
