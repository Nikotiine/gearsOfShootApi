import { Controller, Get } from '@nestjs/common';
import { OpticReadyPlateService } from './optic-ready-plate.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { OpticReadyPlateDto } from '../../dto/optic-ready-plate.dto';

@Controller('optic-ready-plate')
@ApiTags('Optic-ready-plate')
export class OpticReadyPlateController {
  constructor(
    private readonly opticReadyPlateService: OpticReadyPlateService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des type de detente d arme',
  })
  @ApiOkResponse({
    type: [OpticReadyPlateDto],
  })
  public async findAll(): Promise<OpticReadyPlateDto[]> {
    return await this.opticReadyPlateService.findAll();
  }
}
