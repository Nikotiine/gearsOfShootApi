import { BaseEntity } from './base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Riffle } from './riffle.entity';
@Entity()
export class MLockOption extends BaseEntity {
  @Column()
  name: string;
}
