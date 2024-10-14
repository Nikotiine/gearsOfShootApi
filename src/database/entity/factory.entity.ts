import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Weapon } from './weapon.entity';
import { FactoryType } from '../../enum/factoryTypes.enum';
import { Ammunition } from './ammunition.entity';
import { WeaponMagazine } from './weaponMagazine.entity';
import { SoundNoiseReducer } from './soundNoiseReducer.entity';

@Entity()
export class Factory extends BaseEntity {
  @Column()
  name: string;
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
