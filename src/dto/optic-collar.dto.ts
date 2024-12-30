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
}
