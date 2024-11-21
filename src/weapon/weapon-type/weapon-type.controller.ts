import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WeaponTypeService } from './weapon-type.service';
import {
  CreateWeaponTypeDto,
  ListOfPrerequisitesWeaponTypeDto,
  UpdateWeaponTypeDto,
  WeaponTypeDto,
} from '../../dto/weapon.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('weapon-type')
@ApiTags('Weapon type')
export class WeaponTypeController {
  constructor(private readonly weaponTypeService: WeaponTypeService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Liste complete',
    description: 'Retourne la liste des diffents type d armes possible',
  })
  @ApiOkResponse({
    type: [WeaponTypeDto],
  })
  public async findAllWeaponTypes(): Promise<WeaponTypeDto[]> {
    return await this.weaponTypeService.findAll();
  }

  @Get('prerequisites')
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d un type d arme',
  })
  @ApiOkResponse({
    type: ListOfPrerequisitesWeaponTypeDto,
  })
  public async findPrerequisitesWeaponTypeList(): Promise<ListOfPrerequisitesWeaponTypeDto> {
    return this.weaponTypeService.findPrerequisitesWeaponTypeDto();
  }

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

  @Put(':id')
  @ApiCreatedResponse({
    type: WeaponTypeDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un type d arme',
  })
  @ApiBody({
    type: UpdateWeaponTypeDto,
  })
  @ApiParam({
    name: 'id',
  })
  public async edit(
    @Param('id') id: number,
    @Body() type: UpdateWeaponTypeDto,
  ): Promise<WeaponTypeDto> {
    return await this.weaponTypeService.edit(id, type);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d un type d arme',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.weaponTypeService.delete(id);
  }
}
