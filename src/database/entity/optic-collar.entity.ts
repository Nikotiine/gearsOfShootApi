import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { RailSize } from './rail-size.entity';
import { Factory } from './factory.entity';
import { BaseAuditEntityWithSaleOptions } from './custom-base-audit';
import { User } from './user.entity';

@Entity()
@Unique(['name', 'factory', 'height', 'diameter'])
export class OpticCollar extends BaseAuditEntityWithSaleOptions {
  @ManyToOne(() => Factory, (factory) => factory.opticsCollar)
  factory: Factory;

  @Column()
  diameter: number;

  @Column()
  height: number;

  @ManyToOne(() => RailSize, (rail) => rail.opticCollars)
  railSize: RailSize;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column()
  description: string;

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
