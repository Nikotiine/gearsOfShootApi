import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBase } from './custom-base';

import { HandGun } from './hand-gun.entity';
import { Riffle } from './riffle.entity';

@Entity()
export class Color extends CustomBase {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => HandGun, (weapon) => weapon.buttColor)
  buttHandguns: HandGun[];

  @OneToMany(() => HandGun, (weapon) => weapon.barrelColor)
  barrelHandguns: HandGun[];
  @OneToMany(() => Riffle, (weapon) => weapon.buttColor)
  buttRiffle?: Riffle[];

  @OneToMany(() => Riffle, (weapon) => weapon.barrelColor)
  barrelRiffle?: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.slideColor)
  slides: HandGun[];
}
