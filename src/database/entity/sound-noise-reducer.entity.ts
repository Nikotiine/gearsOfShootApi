import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ThreadedSize } from './threaded-size.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import {
  BaseAuditEntity,
  BaseAuditEntityWithSaleOptions,
} from './base-audit.entity';

@Entity()
@Unique(['threadedSize', 'factory', 'name'])
export class SoundNoiseReducer extends BaseAuditEntityWithSaleOptions {
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
  chicane: number;

  @Column()
  estimatedNoiseReduction: number;

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
