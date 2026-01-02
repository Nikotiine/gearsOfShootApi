import { BaseEntity } from './base.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export class BaseAuditEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy?: User;
}
export class BaseAuditEntityWithSaleOptions extends BaseAuditEntity {
  @Column({ default: false })
  isDiscounted: boolean;
}
