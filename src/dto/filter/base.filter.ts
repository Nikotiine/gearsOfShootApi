import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseFilter {
  @ApiPropertyOptional({
    example: 10,
    description: 'Nombre maximum de résultats à renvoyer',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 0,
    description: 'Décalage pour la pagination',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({ example: 'B' })
  @IsOptional()
  @IsString()
  reference?: string;
}
