import { ApiProperty } from '@nestjs/swagger';
import { OpticUnitDto } from './optic-unit.dto';

export class OpticClickValueDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: OpticUnitDto,
  })
  opticUnit: OpticUnitDto;

  @ApiProperty()
  id: number;
}
