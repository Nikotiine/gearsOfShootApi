import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
@Entity()
export class WeaponBarrelType extends BaseEntity {
  @Column()
  label: string;

  @OneToMany(() => Weapon, (weapon) => weapon.barrelType)
  weapons: Weapon[];
}
