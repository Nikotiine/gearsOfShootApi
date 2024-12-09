import { ApiProperty } from '@nestjs/swagger';

export class OpticReadyPlateDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  reference: string;
}
