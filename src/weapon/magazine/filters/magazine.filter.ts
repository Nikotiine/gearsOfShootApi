import { BaseFilter } from '../../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MagazineFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Nom du chargeur' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'La categorie de lu chargeur' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Le calibre' })
  @IsOptional()
  @IsString()
  caliber?: string;
}
