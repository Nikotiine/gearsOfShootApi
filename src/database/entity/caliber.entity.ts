import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

import { Ammunition } from './ammunition.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
@Entity()
export class Caliber extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => Riffle, (riffle) => riffle.caliber)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.caliber)
  handguns: HandGun[];

  @OneToMany(() => Ammunition, (ammunition) => ammunition.caliber)
  ammunitions: Ammunition[];

  @OneToMany(
    () => SoundNoiseReducer,
    (soundNoiseReducer) => soundNoiseReducer.caliber,
  )
  soundNoiseReducers: SoundNoiseReducer[];

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.caliber)
  magazines: WeaponMagazine[];
}
