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
import { Material } from './material.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
@Entity()
export class WeaponMagazine extends BaseEntity {
  @Column()
  capacity: number;

  @ManyToOne(() => Material, (body) => body.magazines)
  body: Material;

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

  @ManyToMany(() => Riffle, (riffle) => riffle.compatiblesMagazines)
  @JoinTable({
    name: 'riffle_magazines',
  })
  riffles: Riffle[];

  @OneToMany(() => Riffle, (riffle) => riffle.providedMagazine)
  riffle: Riffle;

  @ManyToMany(() => HandGun, (handgun) => handgun.compatiblesMagazines)
  @JoinTable({
    name: 'handgun_magazines',
  })
  handguns: HandGun[];

  @OneToMany(() => HandGun, (handgun) => handgun.providedMagazine)
  handgun: HandGun;

  @Column({ nullable: true })
  description: string;
}
