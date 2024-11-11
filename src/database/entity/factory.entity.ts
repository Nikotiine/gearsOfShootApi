import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Weapon } from './weapon.entity';

import { Ammunition } from './ammunition.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
import { FactoryType } from './factory-type.entity';
import { Optic } from './optic.entity';

@Entity()
@Unique(['name', 'type'])
export class Factory extends BaseEntity {
  @Column()
  name: string;
  @Column()
  ref: string;
  @Column({ nullable: true })
  description: string;
  @OneToMany(() => Weapon, (weapon) => weapon.factory)
  weapons: Weapon[];
  @OneToMany(() => Ammunition, (ammunition) => ammunition.factory)
  ammunitions: Ammunition[];
  @OneToMany(() => Optic, (optic) => optic.factory)
  optics: Optic[];
  @OneToMany(() => WeaponMagazine, (magazine) => magazine.factory)
  magazines: WeaponMagazine[];
  @OneToMany(
    () => SoundNoiseReducer,
    (soundNoiseReducer) => soundNoiseReducer.factory,
  )
  soundNoiseReducers: SoundNoiseReducer[];
  @ManyToOne(() => FactoryType, (type) => type.factories)
  type: FactoryType;
}
