import { ApiProperty } from '@nestjs/swagger';
import { FactoryType } from '../enum/factory-types.enum';
export class CreateFactoryDto {
  @ApiProperty({
    example: 'Colt',
  })
  name: string;
  @ApiProperty({
    enum: FactoryType,
    example: FactoryType.WEAPON,
  })
  type: FactoryType;
  @ApiProperty({
    example: 'Une description de la marque et ses produits',
  })
  description: string;
}
export class FactoryDto extends CreateFactoryDto {
  @ApiProperty()
  id: number;
}
