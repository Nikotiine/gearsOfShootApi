import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactoryTypeService } from './factory-type.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { FactoryTypeDto } from '../../dto/factory.dto';

@ApiTags('FactoryType')
@Controller('factory-type')
export class FactoryTypeController {
  constructor(private readonly factoryTypeService: FactoryTypeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    description: 'Retourne la listes de toutes les marques',
    type: [FactoryTypeDto],
  })
  public async findAll(): Promise<FactoryTypeDto[]> {
    return this.factoryTypeService.findAll();
  }
}
