import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ammunition } from './ammunition.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
import { FactoryType } from './factory-type.entity';
import { Optic } from './optic.entity';
import { OpticReadyPlate } from './optic-ready-plate.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';

@Entity()
@Unique(['name', 'type'])
export class Factory extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reference: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Riffle, (riffle) => riffle.factory)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.factory)
  handguns: HandGun[];

  @OneToMany(() => Ammunition, (ammunition) => ammunition.factory)
  ammunitions: Ammunition[];

  @OneToMany(() => OpticReadyPlate, (opticsReady) => opticsReady.factory)
  opticsReadyPlates: OpticReadyPlate[];

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
