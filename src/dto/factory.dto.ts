import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateFactoryTypeDto {
  @ApiProperty({
    example: 'Arme',
  })
  name: string;
}
export class FactoryTypeDto extends CreateFactoryTypeDto {
  @ApiProperty()
  id: number;
}
export class CreateFactoryDto {
  @ApiProperty({
    example: 'Colt',
  })
  name: string;
  @ApiProperty({})
  typeId: number;
  @ApiProperty({
    example: 'Une description de la marque et ses produits',
  })
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  ref: string;
}
export class EditFactoryDto extends CreateFactoryDto {
  @ApiProperty()
  id: number;
}
export class FactoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Une description de la marque et ses produits',
  })
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  ref: string;
  @ApiProperty()
  type: FactoryTypeDto;
  @ApiProperty({
    example: 'Colt',
  })
  name: string;
}
export class ListOfPrerequisitesFactoryDto {
  @ApiProperty({
    type: [FactoryTypeDto],
  })
  types: FactoryTypeDto[];
}
