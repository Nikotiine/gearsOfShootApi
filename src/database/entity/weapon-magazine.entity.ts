import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Factory } from './factory.entity';
import { Caliber } from './caliber.entity';
import { WeaponMagazineBodyType } from './weapon-magazine-body-type.entity';
@Entity()
export class WeaponMagazine extends BaseEntity {
  @Column()
  capacity: number;
  @ManyToOne(() => WeaponMagazineBodyType, (body) => body.magazines)
  body: WeaponMagazineBodyType;
  @ManyToOne(() => Factory, (factory) => factory.magazines)
  factory: Factory;
  @Column()
  length: number;
  @Column()
  height: number;
  @Column()
  width: number;
  @Column()
  reference: string;
  @ManyToOne(() => Caliber, (caliber) => caliber.magazines)
  caliber: Caliber;
}
