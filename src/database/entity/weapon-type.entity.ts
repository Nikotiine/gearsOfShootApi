import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { WeaponReloadMode } from './weapon-reload-mode.entity';

@Entity()
export class WeaponType extends BaseEntity {
  // Type d'arme
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => WeaponReloadMode, (mode) => mode.weaponTypes)
  mode: WeaponReloadMode;

  @Column()
  reference: string;

  @OneToMany(() => Weapon, (weapon) => weapon.type)
  weapons: Weapon[];
}
