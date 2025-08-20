import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Factory } from './factory.entity';
import { OpticType } from './optic-type.entity';
import { OpticFocalPlane } from './optic-focal-plane.entity';
import { OpticUnit } from './optic-unit.entity';
import { RailSize } from './rail-size.entity';
import { BaseAuditEntity } from './base-audit.entity';

@Entity()
@Unique([
  'name',
  'factory',
  'minZoom',
  'maxZoom',
  'bodyDiameter',
  'lensDiameter',
])
export class Optic extends BaseAuditEntity {
  @Column()
  name: string;

  @ManyToOne(() => Factory, (factory) => factory.optics)
  factory: Factory;

  @Column()
  minZoom: number;

  @Column()
  maxZoom: number;

  @Column()
  description: string;

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

  @ManyToOne(() => RailSize, (size) => size.opticsWithProvidedCollar)
  providedOpticCollarSize: RailSize;

  // Reference de l'objet
  @Column()
  reference: string;
}
