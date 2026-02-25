import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { HandGun } from './hand-gun.entity';

@Entity()
export class TriggerType extends CustomBase {
  @Column()
  name: string;

  @Column()
  reference: string;

  @OneToMany(() => HandGun, (handgun) => handgun.triggerType)
  weapons: HandGun[];
}
