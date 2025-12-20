import { BaseFilter } from '../../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FactoryFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Libelle de la marque' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Le type' })
  @IsOptional()
  @IsString()
  type?: string;
}
