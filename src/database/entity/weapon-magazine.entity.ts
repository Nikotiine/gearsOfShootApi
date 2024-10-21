import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MagazineBody } from '../../enum/magazine-body.enum';
import { Factory } from './factory.entity';
@Entity()
export class WeaponMagazine extends BaseEntity {
  @Column()
  capacity: number;
  @Column({ enum: MagazineBody })
  body: MagazineBody;
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
}
