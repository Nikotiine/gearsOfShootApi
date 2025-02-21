import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RiffleDto } from './riffle.dto';
import { HandGunDto } from './hand-gun.dto';

export class CreateWeaponMagazineDto {
  @ApiProperty({
    description: 'Capacite en munition',
  })
  capacity: number;

  @ApiProperty({
    description: 'longeur du chargeur',
  })
  length: number;

  @ApiProperty({
    description: 'hauteur du chargeur',
  })
  height: number;

  @ApiProperty({
    description: 'largeur du chargeur',
  })
  width: number;

  @ApiProperty()
  reference: string;

  @ApiProperty({
    description: 'matiere du chargeur',
  })
  bodyId: number;

  @ApiProperty({
    description: 'marque du chargeur',
  })
  factoryId: number;

  @ApiProperty({
    description: 'calibre des munitions du chargeur',
  })
  caliberId: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'La categorie de l arme en france',
  })
  categoryId: number;

  @ApiProperty({
    description: 'La categorie de l arme en france',
  })
  weaponTypeId: number;

  @ApiProperty({
    type: [RiffleDto],
    nullable: true,
  })
  @IsOptional()
  compatibleRiffle: RiffleDto[];

  @ApiProperty({
    type: [HandGunDto],
    nullable: true,
  })
  @IsOptional()
  compatibleHandGun: HandGunDto[];
}
export class UpdateWeaponMagazineDto extends CreateWeaponMagazineDto {
  @ApiProperty()
  id: number;
}
