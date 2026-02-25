import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Factory } from './factory.entity';

@Entity()
export class FactoryType extends CustomBase {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Factory, (factory) => factory.type)
  factories: Factory[];
}
