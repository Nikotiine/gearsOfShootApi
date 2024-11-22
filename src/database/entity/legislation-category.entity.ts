import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ammunition } from './ammunition.entity';
import { Weapon } from './weapon.entity';
@Entity()
export class LegislationCategory extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ammunition, (ammunition) => ammunition.category)
  ammuntions: Ammunition[];

  @OneToMany(() => Weapon, (weapon) => weapon.category)
  weapons: Weapon[];
}
