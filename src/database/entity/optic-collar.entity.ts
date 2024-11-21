import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Optic } from './optic.entity';
@Entity()
export class OpticCollar extends BaseEntity {
  @Column()
  diameter: number;

  @Column()
  height: number;

  @Column()
  railSize: string;

  @OneToMany(() => Optic, (optic) => optic.providedCollar)
  opticsWithCollard: Optic[];
}
