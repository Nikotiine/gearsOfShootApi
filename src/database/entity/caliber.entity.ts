import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { Ammunition } from './ammunition.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
@Entity()
export class Caliber extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => Weapon, (weapon) => weapon.caliber)
  weapons: Weapon[];

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
