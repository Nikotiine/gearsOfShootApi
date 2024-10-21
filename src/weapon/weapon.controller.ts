import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WeaponService } from './weapon.service';
import {
  CreateWeaponDto,
  ListOfPrerequisitesWeaponDto,
  WeaponDto,
} from '../dto/weapon.dto';

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

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesWeaponDto,
  })
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une arme',
  })
  public async findPrerequisitesWeaponList(): Promise<ListOfPrerequisitesWeaponDto> {
    return this.weaponService.getListOfPrerequisitesWeaponList();
  }
}
