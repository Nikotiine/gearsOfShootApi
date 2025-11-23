import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseFilter } from './base.filter';

export class AmmunitionFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'B' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Glock' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: '9mm' })
  @IsOptional()
  @IsString()
  caliber?: string;

  @ApiPropertyOptional({ example: 'B' })
  @IsOptional()
  @IsString()
  name?: string;
}
