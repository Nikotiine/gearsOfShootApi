import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
@Entity()
export class ThreadedSize extends BaseEntity {
  @OneToMany(() => Weapon, (weapon) => weapon.threadedSize)
  weapons?: Weapon[];

  @OneToMany(
    () => SoundNoiseReducer,
    (soundNoiseReducer) => soundNoiseReducer.threadedSize,
  )
  soundNoiseReducers: SoundNoiseReducer[];

  @Column({ unique: true })
  size: string;

  @Column()
  ref: string;
}
