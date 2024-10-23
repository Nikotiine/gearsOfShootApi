import { ApiProperty } from '@nestjs/swagger';
import { FactoryType } from '../enum/factory-types.enum';
import { IsNotEmpty } from 'class-validator';
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
  @ApiProperty()
  @IsNotEmpty()
  ref: string;
}
export class FactoryDto extends CreateFactoryDto {
  @ApiProperty()
  id: number;
}
