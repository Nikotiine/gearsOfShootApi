import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ammunition } from './ammunition.entity';
import { Weapon } from './weapon.entity';
@Entity()
export class PercussionType extends BaseEntity {
  @Column()
  label: string;

  @OneToMany(() => Ammunition, (ammunition) => ammunition.percussionType)
  ammuntions: Ammunition[];

  @OneToMany(() => Weapon, (weapon) => weapon.percussionType)
  weapons: Weapon[];
}
