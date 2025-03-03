import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { RailSize } from './rail-size.entity';
import { Factory } from './factory.entity';
//TODO:Mettre l unicite en place
@Entity()
export class OpticCollar extends BaseEntity {
  @ManyToOne(() => Factory, (factory) => factory.opticsCollar)
  factory: Factory;

  @Column()
  diameter: number;

  @Column()
  height: number;

  @ManyToOne(() => RailSize, (rail) => rail.opticCollars)
  railSize: RailSize;
}
