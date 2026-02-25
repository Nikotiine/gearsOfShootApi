import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { SoundNoiseReducer } from './sound-noise-reducer.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';

@Entity()
export class ThreadedSize extends CustomBase {
  @OneToMany(() => Riffle, (riffle) => riffle.threadedSize)
  riffles?: Riffle[];
  @OneToMany(() => HandGun, (handgun) => handgun.threadedSize)
  handguns?: HandGun[];
  @OneToMany(
    () => SoundNoiseReducer,
    (soundNoiseReducer) => soundNoiseReducer.threadedSize,
  )
  soundNoiseReducers: SoundNoiseReducer[];

  @Column({ unique: true })
  size: string;

  @Column()
  reference: string;
}
