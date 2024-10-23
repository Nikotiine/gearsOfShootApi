import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Weapon } from './weapon.entity';
import { FactoryType } from '../../enum/factory-types.enum';
import { Ammunition } from './ammunition.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';

@Entity()
@Unique(['name', 'factoryType'])
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
  @OneToMany(() => WeaponMagazine, (magazine) => magazine.factory)
  magazines: WeaponMagazine[];
  @OneToMany(
    () => SoundNoiseReducer,
    (soundNoiseReducer) => soundNoiseReducer.factory,
  )
  soundNoiseReducers: SoundNoiseReducer[];
  @Column({ enum: FactoryType })
  factoryType: FactoryType;
}
