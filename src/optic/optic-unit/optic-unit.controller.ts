import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpticUnitService } from './optic-unit.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { OpticUnitDto } from '../../dto/optic.dto';

@Controller('optic-unit')
@ApiTags('OpticUnit')
export class OpticUnitController {
  constructor(private readonly opticUnitService: OpticUnitService) {}
  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des plans focal',
  })
  @ApiOkResponse({
    type: [OpticUnitDto],
  })
  public async findAll(): Promise<OpticUnitDto[]> {
    return await this.opticUnitService.findAll();
  }
}
