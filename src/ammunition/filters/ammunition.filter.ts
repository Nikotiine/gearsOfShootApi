import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFilter } from '../../dto/filter/base.filter';

export class AmmunitionFilter extends BaseFilter {
  @ApiPropertyOptional({ description: 'La categorie de la munition' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Id de la marque' })
  @IsOptional()
  @IsNumber()
  factoryId?: number;

  @ApiPropertyOptional({ description: 'Id du calibre' })
  @IsOptional()
  @IsNumber()
  caliberId?: number;

  @ApiPropertyOptional({ description: 'Le nom du moodel de munition' })
  @IsOptional()
  @IsString()
  name?: string;
}
