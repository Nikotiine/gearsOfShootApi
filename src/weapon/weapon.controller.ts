import { Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto, WeaponDto } from '../dto/weapon.dto';

@Controller('weapon')
@ApiTags('Weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post('')
  @ApiOperation({
    summary: 'Ajour d une arme',
    description: 'Ajoute une nouvelle arme en base de donnee',
  })
  @ApiCreatedResponse({
    type: WeaponDto,
  })
  @ApiBody({
    type: CreateWeaponDto,
  })
  public async create(weapon: CreateWeaponDto): Promise<WeaponDto> {
    return this.weaponService.insert(weapon);
  }
}
