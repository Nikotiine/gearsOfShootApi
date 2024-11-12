import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { FactoryDto } from './factory.dto';
import { FocalPlane, OpticUnit } from '../database/entity/optic.entity';

export class CreateOpticTypeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  ref: string;
}

export class OpticTypeDto extends CreateOpticTypeDto {
  @ApiProperty()
  id: number;
}
export class ListOfPrerequisitesOpticDto {
  @ApiProperty({
    type: [OpticTypeDto],
  })
  types: OpticTypeDto[];
  @ApiProperty({
    type: [FactoryDto],
  })
  factories: FactoryDto[];
}
export class CreateOpticDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  factoryId: number;
  @ApiProperty({
    example: 'Une description de l optique ...',
    nullable: true,
  })
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsNumber()
  maxZoom: number;
  @ApiProperty()
  @IsNumber()
  minZoom: number;
  @ApiProperty()
  @IsNumber()
  minElevation: number;
  @ApiProperty()
  @IsNumber()
  maxElevation: number;
  @ApiProperty()
  @IsNumber()
  valueOfOneClick: number;
  @ApiProperty()
  @IsNumber()
  bodyDiameter: number;
  @ApiProperty()
  @IsNumber()
  lensDiameter: number;
  @ApiProperty()
  @IsNumber()
  minParallax: number;
  @ApiProperty()
  @IsNumber()
  maxParallax: number;
  @ApiProperty()
  isParallax: boolean;
  @ApiProperty({
    enum: OpticUnit,
  })
  opticUnit: OpticUnit;
  @ApiProperty({
    enum: FocalPlane,
  })
  focalPlane: FocalPlane;
}

export class UpdateOpticDto extends CreateOpticDto {
  @ApiProperty()
  id: number;
}

export class OpticDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;
  @ApiProperty({
    example: 'Une description de l optique ...',
    nullable: true,
  })
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsNumber()
  maxZoom: number;
  @ApiProperty()
  @IsNumber()
  minZoom: number;
  @ApiProperty()
  @IsNumber()
  minElevation: number;
  @ApiProperty()
  @IsNumber()
  maxElevation: number;
  @ApiProperty()
  @IsNumber()
  valueOfOneClick: number;
  @ApiProperty()
  @IsNumber()
  bodyDiameter: number;
  @ApiProperty()
  @IsNumber()
  lensDiameter: number;
  @ApiProperty()
  @IsNumber()
  minParallax: number;
  @ApiProperty()
  @IsNumber()
  maxParallax: number;
  @ApiProperty()
  isParallax: boolean;
  @ApiProperty({
    enum: OpticUnit,
  })
  opticUnit: OpticUnit;
  @ApiProperty({
    enum: FocalPlane,
  })
  focalPlane: FocalPlane;
}
