import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MLockOption extends BaseEntity {
  @Column()
  name: string;
}
