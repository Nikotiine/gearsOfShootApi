import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OpticCollar } from './optic-collar.entity';
import { Riffle } from './riffle.entity';
import { Optic } from './optic.entity';
@Entity()
export class RailSize extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => Riffle, (riffle) => riffle.railSize)
  riffles?: Riffle[];

  @OneToMany(() => OpticCollar, (collar) => collar.railSize)
  opticCollars: OpticCollar[];

  @OneToMany(() => Optic, (optic) => optic.providedOpticCollarSize)
  opticsWithProvidedCollar: Optic[];
}
