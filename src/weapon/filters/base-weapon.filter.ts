import { BaseFilter } from '../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseWeaponFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'Sand Viper', description: 'Nom de l arme' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Id de la marque' })
  @IsOptional()
  @IsNumber()
  factoryId?: number;

  @ApiPropertyOptional({ description: 'Id du Calibre' })
  @IsOptional()
  @IsNumber()
  caliberId?: number;

  @ApiPropertyOptional({ description: 'La categorie de la munition' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Longueur mini du canon' })
  @IsOptional()
  @IsNumber()
  barrelLengthMin?: number;

  @ApiPropertyOptional({ description: 'Longueur maxi du canon' })
  @IsOptional()
  @IsNumber()
  barrelLengthMax?: number;

  @ApiPropertyOptional({ description: 'La categorie de la munition' })
  @IsOptional()
  @IsBoolean()
  isThreadedBarrel?: boolean;

  @ApiPropertyOptional({ description: 'Id du Calibre' })
  @IsOptional()
  @IsNumber()
  percussionTypeId?: number;
}
