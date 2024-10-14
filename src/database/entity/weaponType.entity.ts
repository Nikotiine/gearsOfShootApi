import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
@Entity()
export class WeaponType extends BaseEntity {
  @Column()
  name: string;
  @OneToMany(() => Weapon, (weapon) => weapon.type)
  weapons: Weapon[];
}
