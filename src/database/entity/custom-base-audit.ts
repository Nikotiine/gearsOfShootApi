import { CustomBase } from './custom-base';
import { Column } from 'typeorm';

export class CustomBaseAudit extends CustomBase {
  @Column({ name: 'created_by', nullable: true })
  createdById?: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedById?: number;

  @Column({ name: 'deleted_by', nullable: true })
  deletedById?: number;
}
export class BaseAuditEntityWithSaleOptions extends CustomBaseAudit {
  @Column({ default: false })
  isDiscounted: boolean;
}
