import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { WeaponReloadMode } from '../../enum/weapon-type-main-category.enum';
@Entity()
export class WeaponType extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column({ enum: WeaponReloadMode, default: WeaponReloadMode.LINEAR })
  mode: WeaponReloadMode;
  @Column()
  ref: string;
  @OneToMany(() => Weapon, (weapon) => weapon.type)
  weapons: Weapon[];
}
