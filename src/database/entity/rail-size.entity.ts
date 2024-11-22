import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { OpticCollar } from './optic-collar.entity';
@Entity()
export class RailSize extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  reference: string;
  @OneToMany(() => Weapon, (weapon) => weapon.railSize)
  weapons: Weapon[];
  @OneToMany(() => OpticCollar, (collar) => collar.railSize)
  opticCollars: OpticCollar[];
}
