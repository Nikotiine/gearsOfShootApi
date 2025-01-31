import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MaterialService } from './material.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { CreateMaterialDto, MaterialDto } from '../../dto/material.dto';

@Controller('material')
@ApiTags('Material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [MaterialDto],
  })
  public async findAll(): Promise<MaterialDto[]> {
    return await this.materialService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajoute une nouvelle couleur',
  })
  @ApiCreatedResponse({
    type: MaterialDto,
  })
  @ApiBody({
    type: CreateMaterialDto,
  })
  public async create(
    @Body() material: CreateMaterialDto,
  ): Promise<MaterialDto> {
    return await this.materialService.insert(material);
  }
}
