import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { RailSize } from './rail-size.entity';
//TODO:Mettre l unicite en place
@Entity()
export class OpticCollar extends BaseEntity {
  @Column()
  diameter: number;

  @Column()
  height: number;

  @ManyToOne(() => RailSize, (rail) => rail.opticCollars)
  railSize: RailSize;

  @OneToMany(() => Optic, (optic) => optic.providedCollar)
  opticsWithCollard: Optic[];
}
