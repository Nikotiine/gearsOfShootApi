import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Factory } from './factory.entity';

@Entity()
@Unique(['name', 'factory', 'reference'])
export class OpticReadyPlate extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reference: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Factory, (factory) => factory.opticsReadyPlates)
  factory: Factory;
}
