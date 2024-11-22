import { ApiProperty } from '@nestjs/swagger';

export class RailSizeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
}
