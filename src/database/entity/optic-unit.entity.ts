import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
import { BaseEntity } from './base.entity';
@Entity()
export class OpticUnit extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Optic, (optic) => optic.opticUnit)
  optics: Optic[];
}
