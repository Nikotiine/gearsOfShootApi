import { CustomBase } from './custom-base';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { OpticUnit } from './optic-unit.entity';

@Entity()
export class OpticClick extends CustomBase {
  @Column()
  name: string;
  @OneToMany(() => Optic, (optic) => optic.clickValue)
  optic: Optic[];
  @ManyToOne(() => OpticUnit, (unit) => unit.clickValue)
  opticUnit: OpticUnit;
}
