import { ApiProperty } from '@nestjs/swagger';

export class CreateCaliberDto {
  @ApiProperty()
  name: string;
}
export class CaliberDto extends CreateCaliberDto {
  @ApiProperty()
  id: number;
}
