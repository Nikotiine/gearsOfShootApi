import { Column, Entity, OneToMany } from 'typeorm';
import { WeaponMagazine } from './weapon-magazine.entity';
import { BaseEntity } from './base.entity';
import { Weapon } from './weapon.entity';
@Entity()
export class Material extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.body)
  magazines: WeaponMagazine;

  @OneToMany(() => Weapon, (weapon) => weapon.butt)
  weapons: Weapon[];
}
