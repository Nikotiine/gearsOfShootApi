import { ApiProperty } from '@nestjs/swagger';
import { FactoryType } from '../enum/factoryTypes.enum';
export class CreateFactoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty({
    enum: FactoryType,
  })
  type: FactoryType;
  @ApiProperty()
  description: string;
}
export class FactoryDto extends CreateFactoryDto {
  @ApiProperty()
  id: number;
}
