import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';

@Entity()
export class OpticType extends CustomBase {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => Optic, (optic) => optic.type)
  optics: Optic[];
}
