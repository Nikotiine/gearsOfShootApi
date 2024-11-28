import { ApiProperty } from '@nestjs/swagger';
import { FactoryDto } from './factory.dto';
import { CaliberDto } from './caliber.dto';
import { IsOptional } from 'class-validator';
import { MaterialDto } from './material.dto';

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
  @ApiProperty({ nullable: true })
  @IsOptional()
  description: string;
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
    type: MaterialDto,
  })
  body: MaterialDto;
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
    type: [MaterialDto],
  })
  bodies: MaterialDto[];
}
