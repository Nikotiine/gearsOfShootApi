import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadedSizeDto {
  @ApiProperty({
    example: '1/2 x 28',
  })
  size: string;
  @ApiProperty()
  reference: string;
}
export class ThreadedSizeDto extends CreateThreadedSizeDto {
  @ApiProperty()
  id: number;
}
