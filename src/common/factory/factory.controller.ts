import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FactoryService } from './factory.service';
import { CreateFactoryDto, FactoryDto } from '../../dto/factory.dto';
import { FactoryType } from '../../enum/factory-types.enum';

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
    @Param('type') type: FactoryType,
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
}
