import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBase } from './custom-base';
import { WeaponMagazine } from './weapon-magazine.entity';

import { HandGun } from './hand-gun.entity';
import { Riffle } from './riffle.entity';

@Entity()
export class Material extends CustomBase {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.body)
  magazines: WeaponMagazine[];

  @OneToMany(() => HandGun, (handgun) => handgun.buttMaterial)
  handgunsButts: HandGun[];
  @OneToMany(() => Riffle, (riffle) => riffle.buttMaterial)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.slideMaterial)
  handgunsSides: HandGun[];
}
