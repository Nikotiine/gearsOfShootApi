import { Controller, Get } from '@nestjs/common';
import { MLockOptionService } from './m-lock-option.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MLockOptionDto } from '../../dto/m-lock-option.dto';

@Controller('m-lock-option')
@ApiTags('M Lock Options')
export class MLockOptionController {
  constructor(private readonly mLockOptionService: MLockOptionService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les positions MLOCK',
  })
  @ApiOkResponse({
    type: [MLockOptionDto],
  })
  public async findAll(): Promise<MLockOptionDto[]> {
    return await this.mLockOptionService.findAll();
  }
}
