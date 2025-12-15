import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseFilter } from '../../dto/filter/base.filter';

export class AmmunitionFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'La categorie d arme' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'Le calibre' })
  @IsOptional()
  @IsString()
  caliber?: string;

  @ApiPropertyOptional({ example: 'Le nom du moodel de munition' })
  @IsOptional()
  @IsString()
  name?: string;
}
