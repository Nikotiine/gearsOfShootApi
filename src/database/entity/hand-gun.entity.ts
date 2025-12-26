import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

import { OpticReadyPlate } from './optic-ready-plate.entity';
import { Material } from './material.entity';
import { Color } from './color.entity';
import { TriggerType } from './trigger-type.entity';
import { WeaponBase } from './base-weapon.entity';

@Entity()
@Unique(['name', 'variation', 'factory', 'caliber', 'reference'])
export class HandGun extends WeaponBase {
  // =======================
  // Optique
  // =======================
  @Column({ default: false })
  isOpticReady: boolean;

  @ManyToMany(() => OpticReadyPlate, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  providedOpticReadyPlate: OpticReadyPlate[];

  // =======================
  // Glissière
  // =======================
  @ManyToOne(() => Material)
  slideMaterial: Material;

  @ManyToOne(() => Color)
  slideColor: Color;

  // =======================
  // Ergonomie / mécanique
  // =======================
  @Column({ default: false })
  isPicatinyRailSlop: boolean;

  @Column({ default: false })
  decocking: boolean;

  @ManyToOne(() => TriggerType, { nullable: true })
  triggerType?: TriggerType;

  @Column({ default: true })
  isExternalHammer: boolean;

  // =======================
  // Couleurs spécifiques
  // =======================
  @ManyToOne(() => Color)
  buttColor: Color;

  @ManyToOne(() => Color)
  barrelColor: Color;
}
