import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ThreadedSize } from './threaded-size.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
@Entity()
export class SoundNoiseReducer extends BaseEntity {
  @ManyToOne(
    () => ThreadedSize,
    (threadedSize) => threadedSize.soundNoiseReducers,
  )
  threadedSize: ThreadedSize;

  @ManyToOne(() => Caliber, (caliber) => caliber.soundNoiseReducers)
  caliber: Caliber;

  @Column()
  diameter: number;

  @Column()
  length: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Factory, (factory) => factory.soundNoiseReducers)
  factory: Factory;

  @Column({ default: false })
  isCleanable: boolean;

  @Column()
  reference: string;
}
