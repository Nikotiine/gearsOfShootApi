import { ApiProperty } from '@nestjs/swagger';

export class CreateWeaponTypeDto {
  @ApiProperty()
  name: string;
}

export class WeaponTypeDto extends CreateWeaponTypeDto {
  @ApiProperty()
  id: number;
}
