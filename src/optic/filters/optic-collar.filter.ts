import { BaseFilter } from '../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OpticCollarFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Nom du model de collier' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'Le type de rail compatible' })
  @IsOptional()
  @IsString()
  railSize?: string;
}
