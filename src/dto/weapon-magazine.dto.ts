import { ApiProperty } from '@nestjs/swagger';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';

export class WeaponMagazineBodyDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class CreateWeaponMagazineDto {
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  length: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  width: number;
  @ApiProperty()
  reference: string;
  @ApiProperty()
  bodyId: number;
  @ApiProperty()
  factoryId: number;
  @ApiProperty()
  caliberId: number;
}
export class UpdateWeaponMagazineDto extends CreateWeaponMagazineDto {
  @ApiProperty()
  id: number;
}
export class WeaponMagazineDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  length: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  width: number;
  @ApiProperty()
  reference: string;
  @ApiProperty({
    type: WeaponMagazineBodyDto,
  })
  body: WeaponMagazineBodyDto;
  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;
  @ApiProperty({
    type: CaliberDto,
  })
  caliber: CaliberDto;
}
export class ListOfPrerequisitesWeaponMagazineDto {
  @ApiProperty({
    type: [CaliberDto],
  })
  calibers: CaliberDto[];
  @ApiProperty({
    type: [FactoryDto],
  })
  factories: FactoryDto[];
  @ApiProperty({
    type: [WeaponMagazineBodyDto],
  })
  bodies: WeaponMagazineBodyDto[];
}
