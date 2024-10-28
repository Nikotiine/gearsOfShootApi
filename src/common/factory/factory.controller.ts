import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  FactoryDto,
  ListOfPrerequisitesFactoryDto,
} from '../../dto/factory.dto';
import { ListOfPrerequisitesWeaponDto } from '../../dto/weapon.dto';

@Controller('factory')
@ApiTags('Factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all factories',
    description: 'Retourne toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [FactoryDto],
  })
  public async findAll(): Promise<FactoryDto[]> {
    return await this.factoryService.findAll();
  }

  @Get('by/:type')
  @ApiOperation({
    summary: 'Get all factories by type',
    description: 'Retourne toutes les marques suivant leur type',
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

  @Post('')
  @ApiOperation({
    summary: 'Ajout d une marque',
    description: 'Ajout d une nouvelle marque pour un type FactoryType',
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

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesFactoryDto,
  })
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une marque',
  })
  public async findPrerequisitesFactoryList(): Promise<ListOfPrerequisitesFactoryDto> {
    return this.factoryService.getListOfPrerequisitesFactoryList();
  }
}
