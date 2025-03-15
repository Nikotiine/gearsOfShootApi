import { ApiProperty } from '@nestjs/swagger';

import { RailSizeDto } from './rail-size.dto';
import { FactoryDto } from './factory.dto';

export class OpticCollarDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  diameter: number;
  @ApiProperty()
  height: number;
  @ApiProperty({
    type: RailSizeDto,
  })
  railSize: RailSizeDto;
  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;
  @ApiProperty({
    example: 'Une description de la marque et ses produits',
  })
  description: string;
  @ApiProperty()
  reference: string;
  @ApiProperty()
  name: string;
}

export class CreateOpticCollarDto {
  @ApiProperty()
  diameter: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  railSizeId: number;
  @ApiProperty()
  factoryId: number;
  @ApiProperty()
  name: string;
  @ApiProperty({
    example: 'Une description de la marque et ses produits',
  })
  description: string;
}

export class UpdateOpticCollarDto extends CreateOpticCollarDto {
  @ApiProperty()
  id: number;
}
