import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';

export class VerificationCode extends BaseEntity {
  @Column()
  code: number;
}
