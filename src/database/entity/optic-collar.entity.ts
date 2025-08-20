import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { RailSize } from './rail-size.entity';
import { Factory } from './factory.entity';
import { BaseAuditEntity } from './base-audit.entity';

@Entity()
@Unique(['name', 'factory', 'height', 'diameter'])
export class OpticCollar extends BaseAuditEntity {
  @ManyToOne(() => Factory, (factory) => factory.opticsCollar)
  factory: Factory;

  @Column()
  diameter: number;

  @Column()
  height: number;

  @ManyToOne(() => RailSize, (rail) => rail.opticCollars)
  railSize: RailSize;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
