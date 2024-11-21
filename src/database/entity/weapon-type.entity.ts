import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { WeaponReloadMode } from './weapon-reload-mode.entity';

@Entity()
export class WeaponType extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => WeaponReloadMode, (mode) => mode.weaponTypes)
  mode: WeaponReloadMode;

  @Column()
  ref: string;

  @OneToMany(() => Weapon, (weapon) => weapon.type)
  weapons: Weapon[];
}
