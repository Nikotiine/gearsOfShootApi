import { BaseFilter } from '../../../dto/filter/base.filter';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SoundNoiseFilter extends BaseFilter {
  @ApiPropertyOptional({ description: 'La marque' })
  @IsOptional()
  @IsString()
  factory?: string;

  @ApiPropertyOptional({ description: 'Le calibre compatible' })
  @IsOptional()
  @IsString()
  caliber?: string;

  @ApiPropertyOptional({ description: 'Le nom du rds' })
  @IsOptional()
  @IsString()
  name?: string;
}
