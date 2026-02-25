import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ThreadedSize } from './threaded-size.entity';
import { Caliber } from './caliber.entity';
import { Factory } from './factory.entity';
import { BaseAuditEntityWithSaleOptions } from './custom-base-audit';
import { User } from './user.entity';

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

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy?: User;
}
