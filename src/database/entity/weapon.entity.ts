import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
import { RailSize } from './rail-size.entity';
import { Material } from './material.entity';
@Entity()
@Unique(['name', 'variation', 'caliber', 'factory'])
export class Weapon extends BaseEntity {
  @Column()
  name: string;

  //Variante de l'arme si plus declinaison du meme model
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

  // Longueur du canon
  @Column({ nullable: true })
  barrelLength: number;

  // Optic Ready ( arme de poing )
  @Column({ default: false })
  isOpticReady: boolean;

  // Detente reglable
  @Column({ default: false })
  isAdjustableTrigger: boolean;

  // Canon filete
  @Column({ default: false })
  isThreadedBarrel: boolean;

  // Type de Canon
  @ManyToOne(() => WeaponBarrelType, (barrel) => barrel.weapons)
  barrelType: WeaponBarrelType;

  // Taille du filetage
  @ManyToOne(() => ThreadedSize, (threadedSize) => threadedSize.weapons, {
    nullable: true,
  })
  @JoinColumn({ name: 'threadedSizeId' })
  threadedSize?: ThreadedSize | null;

  // Reference de l'objet
  @Column()
  reference: string;

  // Valeur de reglage de la detente
  @Column({ nullable: true })
  adjustableTriggerValue: string;

  // Mode de percussion
  @ManyToOne(() => PercussionType, (type) => type.weapons)
  percussionType: PercussionType;

  // Si plusieur chargeur sont compatibles
  @ManyToMany(() => WeaponMagazine, (mag) => mag.compatiblesWeapons, {
    cascade: ['insert'],
  })
  compatiblesMagazines: WeaponMagazine[];

  // Si un chargeur de base est fournis
  @ManyToOne(() => WeaponMagazine, (mag) => mag.weapon)
  providedMagazine: WeaponMagazine;

  // Capacity du chageur de base
  @Column({ default: 1 })
  providedMagazineQuantity: number;

  // Epaisseur du canon
  @Column()
  barrelSize: number;

  // Crosse reglable
  @Column()
  isAdjustableButt: boolean;

  // Busc ajustable
  @Column()
  isAdjustableBusk: boolean;

  // Matiere de la crosse ou caracasse
  @ManyToOne(() => Material, (butt) => butt.weapons)
  butt: Material;

  // Rail d'optique
  @ManyToOne(() => RailSize, (rail) => rail.weapons, { nullable: true })
  railSize: RailSize;

  // Grenadiere
  @Column()
  grenadierSlot: number;

  // Quick grenadiere
  @Column({ default: 0 })
  qcSlot: number;

  // MLock
  @Column({ default: false })
  isMlockCompatibility: boolean;

  // Picatiny
  @Column({ default: false })
  isPicatinyRailSlop: boolean;

  // Visee ouverte
  @Column({ default: true })
  isOpenAim: boolean;

  // Guidon reglable
  @Column({ default: false })
  isAdjustableFrontSight: boolean;

  // Hausse reglable
  @Column({ default: false })
  isAdjustableBackSight: boolean;

  @Column({ nullable: true, default: null })
  mLockOptions: string;
}
