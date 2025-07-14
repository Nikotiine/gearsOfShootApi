import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { FactoryDto } from './factory.dto';

export class FocalPlaneDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class OpticUnitDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class CreateOpticTypeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
}

export class OpticTypeDto extends CreateOpticTypeDto {
  @ApiProperty()
  id: number;
}

export class CreateOpticDto {
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
  maxDrift: number;

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
    type: OpticUnitDto,
  })
  opticUnit: OpticUnitDto;

  @ApiProperty({
    type: FocalPlaneDto,
  })
  focalPlane: FocalPlaneDto;

  @ApiProperty({
    type: OpticTypeDto,
  })
  opticType: OpticTypeDto;

  @ApiProperty()
  length: number;

  @ApiProperty()
  eyeRelief: number;

  @ApiProperty()
  isCollarsProvided: boolean;
}

export class UpdateOpticDto extends CreateOpticDto {
  @ApiProperty()
  id: number;
}

export class OpticDto extends CreateOpticDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reference: string;
}
