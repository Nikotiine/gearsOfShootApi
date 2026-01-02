import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
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
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('weapon-type')
@ApiTags('Weapon type')
export class WeaponTypeController {
  constructor(private readonly weaponTypeService: WeaponTypeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des diffents type d armes possible',
  })
  @ApiOkResponse({
    type: [WeaponTypeDto],
  })
  public async findAllWeaponTypes(): Promise<WeaponTypeDto[]> {
    return await this.weaponTypeService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du chargeur',
  })
  @ApiOkResponse({
    type: WeaponTypeDto,
  })
  public async findById(@Param('id') id: number): Promise<WeaponTypeDto> {
    return this.weaponTypeService.findById(id);
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
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
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

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: WeaponTypeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un type d arme',
  })
  @ApiBody({
    type: UpdateWeaponTypeDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() type: UpdateWeaponTypeDto,
  ): Promise<WeaponTypeDto> {
    return await this.weaponTypeService.edit(id, type);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique d un type d arme',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.weaponTypeService.delete(id);
  }
}
