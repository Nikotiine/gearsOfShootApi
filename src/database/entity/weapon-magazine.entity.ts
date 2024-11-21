import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Factory } from './factory.entity';
import { Caliber } from './caliber.entity';
import { WeaponMagazineBodyType } from './weapon-magazine-body-type.entity';
import { Weapon } from './weapon.entity';
@Entity()
export class WeaponMagazine extends BaseEntity {
  @Column()
  capacity: number;

  @ManyToOne(() => WeaponMagazineBodyType, (body) => body.magazines)
  body: WeaponMagazineBodyType;

  @ManyToOne(() => Factory, (factory) => factory.magazines)
  factory: Factory;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  reference: string;

  @ManyToOne(() => Caliber, (caliber) => caliber.magazines)
  caliber: Caliber;

  @ManyToMany(() => Weapon, (weapon) => weapon.compatiblesMagazines)
  @JoinTable({
    name: 'weapons_magazines',
  })
  compatiblesWeapons: Weapon[];

  @OneToMany(() => Weapon, (weapon) => weapon.providedMagazine)
  weapon: Weapon;

  @Column({ nullable: true })
  description: string;
}
