import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ammunition } from './ammunition.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
@Entity()
export class PercussionType extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Ammunition, (ammunition) => ammunition.percussionType)
  ammuntions: Ammunition[];

  @OneToMany(() => Riffle, (riffle) => riffle.percussionType)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handGun) => handGun.percussionType)
  handGuns: HandGun[];
}
