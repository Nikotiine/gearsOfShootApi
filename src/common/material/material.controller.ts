import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MaterialService } from './material.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { CreateMaterialDto, MaterialDto } from '../../dto/material.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

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

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du chargeur',
  })
  @ApiOkResponse({
    type: MaterialDto,
  })
  public async findById(@Param('id') id: number): Promise<MaterialDto> {
    return this.materialService.findById(id);
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
  @Put(SwaggerDescription.ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: MaterialDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une matiere',
  })
  @ApiBody({
    type: MaterialDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() material: MaterialDto,
  ): Promise<MaterialDto> {
    return this.materialService.edit(id, material);
  }

  @Delete(SwaggerDescription.ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Sppression logique du materiau',
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.materialService.delete(id);
  }
}
