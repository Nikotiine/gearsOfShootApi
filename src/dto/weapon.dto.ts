import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { WeaponTypeEnum } from '../enum/weapon-type.enum';

export class WeaponReloadModeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class WeaponTriggerTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  reference: string;
}

export class CreateWeaponTypeDto {
  @ApiProperty({
    example: 'Fusil a verrou titi',
  })
  name: string;

  @ApiProperty()
  modeId: number;

  @ApiProperty()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    example: 'handgun ou riffle',
    nullable: true,
  })
  @IsOptional()
  type: WeaponTypeEnum | null;
}

export class UpdateWeaponTypeDto extends CreateWeaponTypeDto {
  @ApiProperty()
  id: number;
}

export class WeaponTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    example: 'Fusil a verrou',
  })
  name: string;

  @ApiProperty({
    type: WeaponReloadModeDto,
  })
  mode: WeaponReloadModeDto;

  @ApiProperty()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    enum: WeaponTypeEnum,
  })
  type: WeaponTypeEnum;
}
export class ListOfPrerequisitesWeaponTypeDto {
  @ApiProperty({
    type: [WeaponReloadModeDto],
  })
  modes: WeaponReloadModeDto[];
}
export class WeaponBarrelTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
