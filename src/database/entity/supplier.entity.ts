import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Supplier extends BaseEntity {
  @Column({ unique: true })
  name: string;
}
