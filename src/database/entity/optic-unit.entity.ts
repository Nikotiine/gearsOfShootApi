import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { CustomBase } from './custom-base';
import { OpticClick } from './optic-click.entity';

@Entity()
export class OpticUnit extends CustomBase {
  @Column()
  name: string;

  @OneToMany(() => Optic, (optic) => optic.opticUnit)
  optics: Optic[];

  @OneToMany(() => OpticClick, (value) => value.opticUnit)
  clickValue: OpticClick[];
}
