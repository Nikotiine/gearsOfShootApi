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
import { WeaponService } from './weapon.service';
import {
  CreateWeaponDto,
  ListOfPrerequisitesWeaponDto,
  UpdateWeaponDto,
  WeaponDto,
} from '../dto/weapon.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';

@Controller('weapon')
@ApiTags('Weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Liste complete',
    description: 'Retourne la liste des references d arme enregister en bdd',
  })
  @ApiOkResponse({
    type: [WeaponDto],
  })
  public async findAll(): Promise<WeaponDto[]> {
    return await this.weaponService.findAll();
  }

  @Get('by/category/:categoryId')
  @ApiParam({
    name: 'categoryId',
  })
  @ApiOperation({
    summary: 'Armes par categorie',
    description: 'Retourne la liste des references d arme enregister en bdd',
  })
  @ApiOkResponse({
    type: [WeaponDto],
  })
  public async findAllByCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<WeaponDto[]> {
    return this.weaponService.findAllByCategory(categoryId);
  }

  @Get('by/id/:id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Par id',
    description: 'Retourne le detail d une arme',
  })
  @ApiOkResponse({
    type: WeaponDto,
  })
  public async findById(@Param('id') id: number): Promise<WeaponDto> {
    return this.weaponService.findById(id);
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

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d une arme',
  })
  @ApiCreatedResponse({
    type: WeaponDto,
  })
  @ApiBody({
    type: UpdateWeaponDto,
  })
  public async edit(
    @Param('id') id: number,
    weapon: UpdateWeaponDto,
  ): Promise<WeaponDto> {
    return await this.weaponService.edit(id, weapon);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d une arme',
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.weaponService.delete(id);
  }
}
