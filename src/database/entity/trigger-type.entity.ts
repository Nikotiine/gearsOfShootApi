import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { HandGun } from './hand-gun.entity';
@Entity()
export class TriggerType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => HandGun, (handgun) => handgun.triggerType)
  weapons: HandGun[];
}
