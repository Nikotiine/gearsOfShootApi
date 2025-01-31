import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  reference: string;
}

export class ColorDto extends CreateColorDto {
  @ApiProperty()
  id: number;
}
