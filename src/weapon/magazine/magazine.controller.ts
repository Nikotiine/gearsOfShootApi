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

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  constructor(private readonly magzineService: MagazineService) {}

  @Get('all')
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  @ApiOperation({
    summary: 'Liste des chargeurs',
    description: 'Retourne la liste de tous les chargeurs disponible',
  })
  public async findAll(): Promise<WeaponMagazineDto[]> {
    return await this.magzineService.findAll();
  }

  @Get('by/:id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Par id',
    description: 'Retourne le detail du chargeur',
  })
  @ApiOkResponse({
    type: WeaponMagazineDto,
  })
  public async findById(@Param('id') id: number): Promise<WeaponMagazineDto> {
    return await this.magzineService.findById(id);
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
