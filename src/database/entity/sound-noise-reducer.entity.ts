import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ThreadedSize } from './threaded-size.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
@Entity()
@Unique(['threadedSize', 'factory', 'name'])
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
