import { ApiProperty } from '@nestjs/swagger';

export class ApiDeleteResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  isSuccess: boolean;
  @ApiProperty()
  message: string;
}
