import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { WeaponType } from './weapon-type.entity';

@Entity()
export class WeaponReloadMode extends CustomBase {
  // Mode de rechargement pour l'arme
  @Column({ unique: true })
  name: string;

  @OneToMany(() => WeaponType, (weapon) => weapon.mode)
  weaponTypes: WeaponType[];
}
