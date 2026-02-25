import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { OpticCollar } from './optic-collar.entity';
import { Riffle } from './riffle.entity';

@Entity()
export class RailSize extends CustomBase {
  @Column({ unique: true })
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => Riffle, (riffle) => riffle.railSize)
  riffles?: Riffle[];

  @OneToMany(() => OpticCollar, (collar) => collar.railSize)
  opticCollars: OpticCollar[];
}
