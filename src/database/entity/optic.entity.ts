import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Factory } from './factory.entity';
export enum FocalPlane {
  FPP = 'Premier plan focal',
  SFP = 'Second plan focal',
}
export enum OpticUnit {
  MOA = 'MOA',
  MIL = 'MIL',
}
@Entity()
export class Optic extends BaseEntity {
  @Column()
  name: string;
  @ManyToOne(() => Factory, (factory) => factory.optics)
  factory: Factory;
  @Column()
  minZoom: number;
  @Column()
  description: string;
  @Column()
  maxZoom: number;
  @Column()
  bodyDiameter: number;
  @Column()
  lensDiameter: number;
  @Column({ enum: FocalPlane, default: FocalPlane.SFP })
  focalPlane: FocalPlane;
  @Column({ default: false })
  isParallax: boolean;
  @Column()
  maxElevation: number;
  @Column()
  minElevation: number;
  @Column({ enum: OpticUnit, default: OpticUnit.MOA })
  opticUnit: OpticUnit;
  @Column()
  valueOfOneClick: number;
  @Column()
  minParallax: number;
  @Column()
  maxParallax: number;
}
