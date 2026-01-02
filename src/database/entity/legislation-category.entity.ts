import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ammunition } from './ammunition.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
import { WeaponMagazine } from './weapon-magazine.entity';

@Entity()
export class LegislationCategory extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ammunition, (ammunition) => ammunition.category)
  ammuntions: Ammunition[];

  @OneToMany(() => Riffle, (riffle) => riffle.category)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.category)
  handguns: HandGun[];

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.category)
  magazines: WeaponMagazine[];
}
