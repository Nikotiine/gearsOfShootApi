import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ColorService } from './color.service';

import { ColorDto, CreateColorDto } from '../../dto/color.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('color')
@ApiTags('Color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [ColorDto],
  })
  public async findAll(): Promise<ColorDto[]> {
    return await this.colorService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajoute une nouvelle couleur',
  })
  @ApiCreatedResponse({
    type: ColorDto,
  })
  @ApiBody({
    type: CreateColorDto,
  })
  public async create(@Body() color: CreateColorDto): Promise<ColorDto> {
    return await this.colorService.insert(color);
  }
}
