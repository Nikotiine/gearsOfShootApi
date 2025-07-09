import { Controller, Get } from '@nestjs/common';
import { PercussionTypeService } from './percussion-type.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LegislationCategoryDto } from '../../dto/legislation-category.dto';

@Controller('percussion-type')
export class PercussionTypeController {
  constructor(private readonly percussionTypeService: PercussionTypeService) {}
  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des types de percussion',
  })
  @ApiOkResponse({
    type: [LegislationCategoryDto],
  })
  public async findAll(): Promise<LegislationCategoryDto[]> {
    return await this.percussionTypeService.findAll();
  }
}
