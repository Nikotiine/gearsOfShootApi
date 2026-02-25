import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { BaseAuditEntityWithSaleOptions } from './custom-base-audit';
import { Factory } from './factory.entity';
import { Caliber } from './caliber.entity';
import { Material } from './material.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
import { LegislationCategory } from './legislation-category.entity';
import { WeaponType } from './weapon-type.entity';
import { User } from './user.entity';

@Entity()
@Unique(['factory', 'category', 'body', 'capacity', 'caliber'])
export class WeaponMagazine extends BaseAuditEntityWithSaleOptions {
  @ManyToOne(() => LegislationCategory, (category) => category.magazines)
  category: LegislationCategory;

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

  @ManyToMany(() => HandGun, (handgun) => handgun.compatiblesMagazines)
  @JoinTable({
    name: 'handgun_magazines',
  })
  handguns: HandGun[];

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => WeaponType, (type) => type.magazines)
  forWeaponType: WeaponType;

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
