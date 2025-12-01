import { ApiProperty } from '@nestjs/swagger';

export class OpticUnitDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
