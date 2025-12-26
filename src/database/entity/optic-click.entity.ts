import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { OpticUnit } from './optic-unit.entity';

@Entity()
export class OpticClick extends BaseEntity {
  @Column()
  name: string;
  @OneToMany(() => Optic, (optic) => optic.clickValue)
  optic: Optic[];
  @ManyToOne(() => OpticUnit, (unit) => unit.clickValue)
  opticUnit: OpticUnit;
}
