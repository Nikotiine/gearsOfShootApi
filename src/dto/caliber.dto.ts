import { ApiProperty } from '@nestjs/swagger';

export class CreateCaliberDto {
  @ApiProperty({
    example: '17 HMR',
  })
  name: string;
}
export class CaliberDto extends CreateCaliberDto {
  @ApiProperty()
  id: number;
}
