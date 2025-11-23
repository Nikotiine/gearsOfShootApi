import { BaseFilter } from './base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OpticFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Nom de lunette' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Vortex' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'Lunette de chasse' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'plan focal' })
  @IsOptional()
  @IsString()
  focalPlane?: string;
}
