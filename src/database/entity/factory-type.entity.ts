import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Factory } from './factory.entity';

@Entity()
export class FactoryType extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Factory, (factory) => factory.type)
  factories: Factory[];
}
