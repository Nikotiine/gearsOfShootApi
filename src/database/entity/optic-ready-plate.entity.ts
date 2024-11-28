import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Factory } from './factory.entity';
@Entity()
export class OpticReadyPlate extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Factory, (factory) => factory.opticsReadyPlates)
  factory: Factory;
}
