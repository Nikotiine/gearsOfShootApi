import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LegislationCategoryService } from './legislation-category.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { LegislationCategoryDto } from '../../dto/legislation-category.dto';

@Controller('legislation-category')
@ApiTags('LegislationCategory')
export class LegislationCategoryController {
  constructor(
    private readonly legislationCategoryService: LegislationCategoryService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des categories d arme',
  })
  @ApiOkResponse({
    type: [LegislationCategoryDto],
  })
  public async findAll(): Promise<LegislationCategoryDto[]> {
    return await this.legislationCategoryService.findAll();
  }
}
