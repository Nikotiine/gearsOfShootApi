import { ApiProperty } from '@nestjs/swagger';

export class LegislationCategoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
