import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
@Entity()
export class WeaponButtType extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  reference: string;
  @OneToMany(() => Weapon, (weapon) => weapon.butt)
  weapons: Weapon[];
}
