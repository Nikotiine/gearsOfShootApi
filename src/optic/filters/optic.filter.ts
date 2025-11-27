import { BaseFilter } from '../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OpticFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Nom de lunette' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'Le type de lunette' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'Le type de plan focal' })
  @IsOptional()
  @IsString()
  focalPlane?: string;
}
