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
import { FactoryService, FactoryTypes } from './factory.service';
import {
  CreateFactoryDto,
  EditFactoryDto,
  FactoryDto,
  ListOfPrerequisitesFactoryDto,
} from '../../dto/factory.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('factory')
@ApiTags('Factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Liste complete',
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [FactoryDto],
  })
  public async findAll(): Promise<FactoryDto[]> {
    return await this.factoryService.findAll();
  }

  @Get('by/:type')
  @ApiOperation({
    summary: 'Liste par type',
    description: 'Retourne la liste des marques suivant leur type ',
  })
  @ApiOkResponse({
    type: [FactoryDto],
  })
  @ApiParam({
    name: 'type',
  })
  public async findByType(
    @Param('type') type: FactoryTypes,
  ): Promise<FactoryDto[]> {
    return await this.factoryService.findByType(type);
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesFactoryDto,
  })
  @ApiOperation({
    summary: 'Pre-requis de creation',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une marque',
  })
  public async findPrerequisitesFactoryList(): Promise<ListOfPrerequisitesFactoryDto> {
    return this.factoryService.getListOfPrerequisitesFactoryList();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout',
    description:
      'Ajout d une nouvelle marque pour un type specifique et retourne le dto apres creation',
  })
  @ApiCreatedResponse({
    type: FactoryDto,
  })
  @ApiBody({
    type: CreateFactoryDto,
  })
  public async create(@Body() factory: CreateFactoryDto): Promise<FactoryDto> {
    return await this.factoryService.insert(factory);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiCreatedResponse({
    type: FactoryDto,
  })
  @ApiBody({
    type: EditFactoryDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d une marque (ne pas editier son type)',
  })
  public async edit(
    @Param('id') id: number,
    @Body() factory: EditFactoryDto,
  ): Promise<FactoryDto> {
    return await this.factoryService.edit(id, factory);
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
    description: 'Sppression logique de la marque',
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.factoryService.delete(id);
  }
}
