import { ApiProperty } from '@nestjs/swagger';

export class ColorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  reference: string;
}
