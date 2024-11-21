import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WeaponType } from './weapon-type.entity';
@Entity()
export class WeaponReloadMode extends BaseEntity {
  @Column()
  label: string;

  @OneToMany(() => WeaponType, (weapon) => weapon.mode)
  weaponTypes: WeaponType[];
}
