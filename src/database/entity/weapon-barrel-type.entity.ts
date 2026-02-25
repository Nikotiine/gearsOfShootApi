import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';

import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';

@Entity()
export class WeaponBarrelType extends CustomBase {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Riffle, (riffle) => riffle.barrelType)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.barrelType)
  handguns: HandGun[];
}
