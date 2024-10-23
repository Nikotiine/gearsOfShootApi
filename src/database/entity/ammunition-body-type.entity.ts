import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ammunition } from './ammunition.entity';
@Entity()
export class AmmunitionBodyType extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @OneToMany(() => Ammunition, (ammunition) => ammunition.bodyType)
  ammunitions: Ammunition[];
  @Column()
  ref: string;
}
