import { ApiProperty } from '@nestjs/swagger';

export class PercussionTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
