import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpticClickService } from './optic-click.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { OpticClickValueDto } from '../../dto/optic-click-value.dto';

@Controller('optic-click')
@ApiTags('optic-click')
export class OpticClickController {
  constructor(private readonly opticClickService: OpticClickService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des plans focal',
  })
  @ApiOkResponse({
    type: [OpticClickValueDto],
  })
  public async findAll(): Promise<OpticClickValueDto[]> {
    return await this.opticClickService.findAll();
  }
}
