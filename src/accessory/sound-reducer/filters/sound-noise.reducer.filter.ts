import { BaseFilter } from '../../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SoundNoiseFilter extends BaseFilter {
  @ApiPropertyOptional({ example: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ example: 'Le calibre compatible' })
  @IsOptional()
  @IsString()
  caliber?: string;

  @ApiPropertyOptional({ example: 'Le nom du rds' })
  @IsOptional()
  @IsString()
  name?: string;
}
