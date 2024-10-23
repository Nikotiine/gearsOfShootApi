import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AmmunitionService } from './ammunition.service';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  ListOfPrerequisitesAmmunitionDto,
} from '../dto/ammunition.dto';
import { LegislationCategories } from '../enum/legislation-categories.enum';

@Controller('ammunition')
@ApiTags('Ammunition')
export class AmmunitionController {
  constructor(private readonly ammunitionService: AmmunitionService) {}

  @Post('')
  @ApiOperation({
    summary: 'Ajouter une munition',
    description: 'Creation d une nouvelle munition en base de donnée',
  })
  @ApiCreatedResponse({
    type: AmmunitionDto,
  })
  @ApiBody({
    type: CreateAmmunitionDto,
  })
  public async create(
    @Body() ammunition: CreateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    return await this.ammunitionService.insert(ammunition);
  }

  @Get('by/caliber/:id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Filtre par calibre',
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @ApiOkResponse({
    type: [AmmunitionDto],
  })
  public async findByCaliber(
    @Param('caliberId') caliberId: number,
  ): Promise<AmmunitionDto[]> {
    return this.ammunitionService.findByCaliber(caliberId);
  }

  @Get('by/category/:category')
  @ApiParam({
    name: 'category',
  })
  @ApiOperation({
    summary: 'Filtre par calibre',
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @ApiOkResponse({
    type: [AmmunitionDto],
  })
  public async findByCategory(
    @Param('category') category: LegislationCategories,
  ): Promise<AmmunitionDto[]> {
    return this.ammunitionService.findByCategory(category);
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesAmmunitionDto,
  })
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une nouvelle munition',
  })
  public async findPrerequisitesAmmunitionList(): Promise<ListOfPrerequisitesAmmunitionDto> {
    return this.ammunitionService.getListOfPrerequisitesAmmunitionDto();
  }
}
