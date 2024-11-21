import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Factory } from './factory.entity';
import { OpticType } from './optic-type.entity';
import { OpticFocalPlane } from './optic-focal-plane.entity';
import { OpticUnit } from './optic-unit.entity';
import { OpticCollar } from './optic-collar.entity';

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

  @ManyToOne(() => OpticFocalPlane, (focalPlane) => focalPlane.optics)
  focalPlane: OpticFocalPlane;

  @Column({ default: false })
  isParallax: boolean;

  @Column()
  maxElevation: number;

  @Column()
  maxDrift: number;

  @ManyToOne(() => OpticUnit, (unit) => unit.optics)
  opticUnit: OpticUnit;

  @Column()
  valueOfOneClick: number;

  @Column()
  minParallax: number;

  @Column()
  maxParallax: number;

  @ManyToOne(() => OpticType, (type) => type.optics)
  type: OpticType;

  @Column()
  length: number;

  @Column()
  eyeRelief: number;

  @Column()
  isCollarsProvided: boolean;

  @ManyToOne(() => OpticCollar, (collar) => collar.opticsWithCollard, {
    nullable: true,
  })
  providedCollar: OpticCollar;
}
