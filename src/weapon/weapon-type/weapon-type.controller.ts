import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WeaponTypeService } from './weapon-type.service';
import { CreateWeaponTypeDto, WeaponTypeDto } from '../../dto/weapon.dto';

@Controller('weapon-type')
@ApiTags('Weapon type')
export class WeaponTypeController {
  constructor(private readonly weaponTypeService: WeaponTypeService) {}

  @Post('')
  @ApiOperation({
    summary: 'Ajout d un type d arme',
    description: 'Ajout d un nouveau type d arme en bdd',
  })
  @ApiCreatedResponse({
    type: WeaponTypeDto,
  })
  @ApiBody({
    type: CreateWeaponTypeDto,
  })
  public async create(
    @Body() weaponType: CreateWeaponTypeDto,
  ): Promise<WeaponTypeDto> {
    return this.weaponTypeService.insert(weaponType);
  }

  @Get('')
  @ApiOperation({
    summary: 'Liste des types d arme',
    description: 'Retourne la liste des diffents type d arme possible',
  })
  @ApiOkResponse({
    type: [WeaponTypeDto],
  })
  public async findAllWeaponTypes(): Promise<WeaponTypeDto[]> {
    return await this.weaponTypeService.findAll();
  }
}
