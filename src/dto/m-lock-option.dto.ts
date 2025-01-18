import { ApiProperty } from '@nestjs/swagger';

export class MLockOptionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: number;
}
