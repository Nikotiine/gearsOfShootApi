import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBase } from './custom-base';
import { Ammunition } from './ammunition.entity';

@Entity()
export class AmmunitionHeadType extends CustomBase {
  // Nom du type d'ogive
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ammunition, (ammunition) => ammunition.headType)
  ammunitions: Ammunition[];

  @Column()
  reference: string;
}
