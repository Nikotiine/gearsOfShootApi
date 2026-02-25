import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { RailSize } from './rail-size.entity';
import { Color } from './color.entity';
import { MLockOption } from './m-lock-option.entity';
import { WeaponBase } from './custom-base-weapon';
import { User } from './user.entity';

@Entity()
@Unique(['name', 'variation', 'factory', 'caliber', 'reference'])
export class Riffle extends WeaponBase {
  // =======================
  // Crosse
  // =======================
  @Column()
  isAdjustableButt: boolean;

  @Column()
  isAdjustableBusk: boolean;

  // =======================
  // Rails & accessoires
  // =======================
  @ManyToOne(() => RailSize, { nullable: true })
  @JoinColumn({ name: 'railSizeId' })
  railSize?: RailSize;

  @Column()
  grenadierSlot: number;

  @Column({ default: 0 })
  qcSlot: number;

  @Column({ default: false })
  isMlockCompatibility: boolean;

  @ManyToMany(() => MLockOption, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  mLockOptions: MLockOption[];

  // =======================
  // Visée
  // =======================
  @Column({ default: true })
  isOpenAim: boolean;

  // =======================
  // Couleurs
  // =======================
  @ManyToOne(() => Color, { nullable: true })
  @JoinColumn({ name: 'buttColorId' })
  buttColor?: Color;

  @ManyToOne(() => Color, { nullable: true })
  @JoinColumn({ name: 'barrelColorId' })
  barrelColor?: Color;

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
