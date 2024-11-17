import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
@Entity()
export class OpticFocalPlane extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Optic, (optic) => optic.focalPlane)
  optics: Optic[];
}
