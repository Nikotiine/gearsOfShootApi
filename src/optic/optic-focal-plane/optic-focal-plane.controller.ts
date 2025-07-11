import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpticFocalPlaneService } from './optic-focal-plane.service';
import { FocalPlaneDto } from '../../dto/optic.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('optic-focal-plane')
@ApiTags('OpticFocalPlane')
export class OpticFocalPlaneController {
  constructor(
    private readonly opticFocalPlaneService: OpticFocalPlaneService,
  ) {}
  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des plans focal',
  })
  @ApiOkResponse({
    type: [FocalPlaneDto],
  })
  public async findAll(): Promise<FocalPlaneDto[]> {
    return await this.opticFocalPlaneService.findAll();
  }
}
