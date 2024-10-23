import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCaliberDto {
  @ApiProperty({
    example: '17 HMR',
  })
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  ref: string;
}
export class CaliberDto extends CreateCaliberDto {
  @ApiProperty()
  id: number;
}
