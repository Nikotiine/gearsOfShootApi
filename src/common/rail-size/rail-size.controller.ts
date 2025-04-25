import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RailSizeService } from './rail-size.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { RailSizeDto } from '../../dto/rail-size.dto';

@Controller('rail-size')
@ApiTags('Rail-size')
export class RailSizeController {
  constructor(private readonly railSizeService: RailSizeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les taille de rail optique',
  })
  @ApiOkResponse({
    type: [RailSizeDto],
  })
  public async findAll(): Promise<RailSizeDto[]> {
    return await this.railSizeService.findAll();
  }
}
