import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FactoryService } from './factory.service';
import { FactoryDto } from '../../dto/factory.dto';
import { FactoryType } from '../../enum/factoryTypes.enum';

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
}
