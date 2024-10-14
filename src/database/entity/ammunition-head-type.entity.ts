import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ammunition } from './ammunition.entity';

@Entity()
export class AmmunitionHeadType extends BaseEntity {
  @Column()
  name: string;
  @OneToMany(() => Ammunition, (ammunition) => ammunition.headType)
  ammunitions: Ammunition[];
}
