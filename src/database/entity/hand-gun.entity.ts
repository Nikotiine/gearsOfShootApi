import { Entity, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { OpticReadyPlate } from './optic-ready-plate.entity';
import { Material } from './material.entity';
import { Color } from './color.entity';
import { TriggerType } from './trigger-type.entity';
import { LegislationCategory } from './legislation-category.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { WeaponType } from './weapon-type.entity';
import { WeaponBarrelType } from './weapon-barrel-type.entity';
import { ThreadedSize } from './threaded-size.entity';
import { PercussionType } from './percussion-type.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class HandGun extends BaseEntity {
  // Optic Ready ( arme de poing )
  @Column({ default: false })
  isOpticReady: boolean;

  // Plaques optiques ready fournies
  @ManyToMany(() => OpticReadyPlate, (plate) => plate.weapons)
  providedOpticReadyPlate: OpticReadyPlate[];

  // Matiere de la glissiere
  @ManyToOne(() => Material, (material) => material.handgunsSides)
  slideMaterial: Material;

  // Couleur de la glissiere
  @ManyToOne(() => Color, (color) => color.slides)
  slideColor: Color;

  // Picatiny
  @Column({ default: false })
  isPicatinyRailSlop: boolean;

  @Column({ default: false })
  decocking: boolean;

  // Type d'action de detente
  @ManyToOne(() => TriggerType, (trigger) => trigger.weapons, {
    nullable: true,
  })
  triggerType: TriggerType;

  // Chien externe
  @Column({ default: true })
  isExternalHammer: boolean;

  //***********************************************************************************************
  @Column()
  name: string;

  //Variante de l'arme si plus declinaison du meme model
  @Column({ nullable: true })
  variation: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => LegislationCategory, (category) => category.handguns)
  category: LegislationCategory;

  @ManyToOne(() => Caliber, (caliber) => caliber.handguns)
  caliber: Caliber;

  @ManyToOne(() => Factory, (factory) => factory.handguns)
  factory: Factory;

  @ManyToOne(() => WeaponType, (type) => type.handguns)
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
  @ManyToOne(() => WeaponBarrelType, (barrel) => barrel.handguns)
  barrelType: WeaponBarrelType;

  // Taille du filetage
  @ManyToOne(() => ThreadedSize, (threadedSize) => threadedSize.handguns, {
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
  @ManyToOne(() => PercussionType, (type) => type.handGuns)
  percussionType: PercussionType;

  // Si plusieur chargeur sont compatibles
  @ManyToMany(() => WeaponMagazine, (mag) => mag.handguns, {
    cascade: ['insert'],
  })
  compatiblesMagazines: WeaponMagazine[];

  // Si un chargeur de base est fournis
  @ManyToOne(() => WeaponMagazine, (mag) => mag.handgun)
  providedMagazine: WeaponMagazine;

  // Capacity du chageur de base
  @Column({ default: 1 })
  providedMagazineQuantity: number;

  // Epaisseur du canon
  @Column()
  barrelSize: number;

  // Matiere de la crosse ou caracasse
  @ManyToOne(() => Material, (material) => material.handgunsButts)
  buttMaterial: Material;

  // Guidon reglable
  @Column({ default: false })
  isAdjustableFrontSight: boolean;

  // Hausse reglable
  @Column({ default: false })
  isAdjustableBackSight: boolean;

  // Couleur de la crosse / caracasse
  @ManyToOne(() => Color, (color) => color.buttHandguns)
  buttColor: Color;

  // Couleur du canon
  @ManyToOne(() => Color, (color) => color.barrelHandguns)
  barrelColor: Color;
}
