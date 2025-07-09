import { ApiProperty } from '@nestjs/swagger';

export class CreateOpticReadyPlateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  reference: string;
}
export class OpticReadyPlateDto extends CreateOpticReadyPlateDto {
  @ApiProperty()
  id: number;
}
