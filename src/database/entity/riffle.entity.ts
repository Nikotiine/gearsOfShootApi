import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { RailSize } from './rail-size.entity';
import { Color } from './color.entity';
import { LegislationCategory } from './legislation-category.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weapon-type.entity';
import { WeaponBarrelType } from './weapon-barrel-type.entity';
import { ThreadedSize } from './threaded-size.entity';
import { PercussionType } from './percussion-type.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { BaseEntity } from './base.entity';
import { Material } from './material.entity';
import { MLockOption } from './m-lock-option.entity';
@Entity()
export class Riffle extends BaseEntity {
  // Crosse reglable
  @Column()
  isAdjustableButt: boolean;

  // Busc ajustable
  @Column()
  isAdjustableBusk: boolean;

  // Rail d'optique
  @ManyToOne(() => RailSize, (rail) => rail.riffles, { nullable: true })
  @JoinColumn({ name: 'railSizeId' })
  railSize?: RailSize;

  // Grenadiere
  @Column()
  grenadierSlot: number;

  // Quick grenadiere
  @Column({ default: 0 })
  qcSlot: number;

  // MLock
  @Column({ default: false })
  isMlockCompatibility: boolean;

  // Visee ouverte
  @Column({ default: true })
  isOpenAim: boolean;

  @ManyToMany(() => MLockOption, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  mLockOptions: MLockOption[];

  // Couleur de la crosse / caracasse
  @ManyToOne(() => Color, (color) => color.buttRiffle, { nullable: true })
  @JoinColumn({ name: 'buttColorId' })
  buttColor?: Color;

  // Couleur du canon
  @ManyToOne(() => Color, (color) => color.barrelRiffle, { nullable: true })
  @JoinColumn({ name: 'barrelColorId' })
  barrelColor?: Color;

  // ************************************************************
  @Column()
  name: string;

  //Variante de l'arme si plus declinaison du meme model
  @Column({ nullable: true })
  variation: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => LegislationCategory, (category) => category.riffles)
  category: LegislationCategory;

  @ManyToOne(() => Caliber, (caliber) => caliber.riffles)
  caliber: Caliber;

  @ManyToOne(() => Factory, (factory) => factory.riffles)
  factory: Factory;

  @ManyToOne(() => WeaponType, (type) => type.riffles)
  type: WeaponType;

  // Longueur du canon
  @Column({ nullable: true })
  barrelLength: number;

  // Detente reglable
  @Column({ default: false })
  isAdjustableTrigger: boolean;

  // Canon filete
  @Column({ default: false })
  isThreadedBarrel: boolean;

  // Type de Canon
  @ManyToOne(() => WeaponBarrelType, (barrel) => barrel.riffles)
  barrelType: WeaponBarrelType;

  // Taille du filetage
  @ManyToOne(() => ThreadedSize, (threadedSize) => threadedSize.riffles, {
    nullable: true,
  })
  @JoinColumn({ name: 'threadedSizeId' })
  threadedSize?: ThreadedSize | null;

  // Reference de l'objet
  @Column()
  reference: string;

  // Valeur de reglage de la detente
  @Column({ nullable: true })
  adjustableTriggerMinWeight: number;
  // Valeur de reglage de la detente
  @Column({ nullable: true })
  adjustableTriggerMaxWeight: number;

  // Mode de percussion
  @ManyToOne(() => PercussionType, (type) => type.riffles)
  percussionType: PercussionType;

  // Si plusieur chargeur sont compatibles
  @ManyToMany(() => WeaponMagazine, (mag) => mag.riffles, {
    cascade: ['insert'],
  })
  compatiblesMagazines: WeaponMagazine[];

  // Capacity du chageur de base
  @Column({ default: 1 })
  providedMagazineQuantity: number;

  // Epaisseur du canon
  @Column()
  barrelSize: number;

  // Matiere de la crosse ou caracasse
  @ManyToOne(() => Material, (material) => material.riffles)
  buttMaterial: Material;

  // Guidon reglable
  @Column({ default: false })
  isAdjustableFrontSight: boolean;

  // Hausse reglable
  @Column({ default: false })
  isAdjustableBackSight: boolean;
}
