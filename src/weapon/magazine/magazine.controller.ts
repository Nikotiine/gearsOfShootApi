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
import { MagazineService } from './magazine.service';
import {
  CreateWeaponMagazineDto,
  ListOfPrerequisitesWeaponMagazineDto,
  UpdateWeaponMagazineDto,
  WeaponMagazineDto,
} from '../../dto/weapon-magazine.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  constructor(private readonly magzineService: MagazineService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les chargeurs disponible',
  })
  public async findAll(): Promise<WeaponMagazineDto[]> {
    return await this.magzineService.findAll();
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
    type: WeaponMagazineDto,
  })
  public async findById(@Param('id') id: number): Promise<WeaponMagazineDto> {
    return await this.magzineService.findById(id);
  }

  @Get(SwaggerDescription.FIND_BY_FACTORY)
  @ApiParam({
    name: SwaggerDescription.FIND_BY_FACTORY_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_FACTORY_SUMMARY,
    description: 'Retourne les chargeurs filtres par marque',
  })
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  public async findByFactory(
    @Param(SwaggerDescription.FIND_BY_FACTORY_PARAM) factoryId: number,
  ): Promise<WeaponMagazineDto[]> {
    return this.magzineService.findByFactory(factoryId);
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesWeaponMagazineDto,
  })
  @ApiOperation({
    summary: 'Liste des prerequis',
    description:
      'Retourne la liste des pre requis de creation d un nouveau chargeur',
  })
  public async findPrerequisitesWeaponMagazineList(): Promise<ListOfPrerequisitesWeaponMagazineDto> {
    return await this.magzineService.getListOfPrerequisitesWeaponMagazineList();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout de chargeur',
    description: 'Ajoute un nouveau chargeur en bdd et le retoune',
  })
  @ApiBody({
    type: CreateWeaponMagazineDto,
  })
  @ApiCreatedResponse({
    type: WeaponMagazineDto,
  })
  public async create(
    @Body() magazine: CreateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    return await this.magzineService.insert(magazine);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiCreatedResponse({
    type: WeaponMagazineDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un chargeur',
  })
  @ApiBody({
    type: UpdateWeaponMagazineDto,
  })
  public async edit(
    @Param('id') id: number,
    @Body() magazine: UpdateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    return await this.magzineService.edit(id, magazine);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique  d un chargeur',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.magzineService.delete(id);
  }
}
