import { ApiProperty } from '@nestjs/swagger';

export class MaterialDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
