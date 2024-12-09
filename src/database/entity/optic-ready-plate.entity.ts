import { BaseEntity } from './base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Factory } from './factory.entity';
import { HandGun } from './hand-gun.entity';
@Entity()
export class OpticReadyPlate extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reference: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Factory, (factory) => factory.opticsReadyPlates)
  factory: Factory;

  @ManyToMany(() => HandGun, (handgun) => handgun.providedOpticReadyPlate)
  @JoinTable({
    name: 'handguns_optic_ready_plate',
  })
  weapons: HandGun[];
}
