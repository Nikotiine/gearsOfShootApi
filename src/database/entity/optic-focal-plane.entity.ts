import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';

@Entity()
export class OpticFocalPlane extends CustomBase {
  @Column()
  name: string;

  @OneToMany(() => Optic, (optic) => optic.focalPlane)
  optics: Optic[];
}
