import { BaseFilter } from '../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OpticCollarFilter extends BaseFilter {
  @ApiPropertyOptional({ description: 'Nom du model de collier' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ description: 'Le type de rail compatible' })
  @IsOptional()
  @IsString()
  railSize?: string;
}
