import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
}

export class MaterialDto extends CreateMaterialDto {
  @ApiProperty()
  id: number;
}
