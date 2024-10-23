import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WeaponService } from './weapon.service';
import {
  CreateWeaponDto,
  ListOfPrerequisitesWeaponDto,
  WeaponDto,
} from '../dto/weapon.dto';
import { LegislationCategories } from '../enum/legislation-categories.enum';

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
  public async create(@Body() weapon: CreateWeaponDto): Promise<WeaponDto> {
    console.log('controller', weapon);
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

  @Get('by/:category')
  @ApiParam({
    name: 'category',
  })
  @ApiOperation({
    summary: 'Armes par categorie',
    description: 'Retourne la liste des references d arme enregister en bdd',
  })
  @ApiOkResponse({
    type: [WeaponDto],
  })
  public async findAllByCategory(
    @Param('category') category: LegislationCategories,
  ): Promise<WeaponDto[]> {
    return this.weaponService.findAllByCategory(category);
  }
}
