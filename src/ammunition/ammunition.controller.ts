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
import { AmmunitionService } from './ammunition.service';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  ListOfPrerequisitesAmmunitionDto,
  UpdateAmmunitionDto,
} from '../dto/ammunition.dto';
import { LegislationCategories } from '../enum/legislation-categories.enum';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';

@Controller('ammunition')
@ApiTags('Ammunition')
export class AmmunitionController {
  constructor(private readonly ammunitionService: AmmunitionService) {}

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
  @Post('')
  @ApiOperation({
    summary: 'Ajout',
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

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: UpdateAmmunitionDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d une  munition en base de donnée',
  })
  @ApiCreatedResponse({
    type: AmmunitionDto,
  })
  public async edit(
    @Param('id') id: number,
    @Body() ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    return await this.ammunitionService.edit(id, ammunition);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d une  munition en base de donnée',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionService.delete(id);
  }
}
