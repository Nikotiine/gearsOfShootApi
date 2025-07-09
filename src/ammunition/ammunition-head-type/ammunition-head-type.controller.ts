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
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';
import {
  AmmunitionHeadTypeDto,
  CreateAmmunitionHeadTypeDto,
} from '../../dto/ammunition.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('ammunition-head-type')
@ApiTags('AmmunitionHeadType')
export class AmmunitionHeadTypeController {
  constructor(
    private readonly ammunitionHeadTypeService: AmmunitionHeadTypeService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de toutes les oviges disponible',
  })
  @ApiOkResponse({
    type: [AmmunitionHeadTypeDto],
  })
  public async findAllHeadTypes(): Promise<AmmunitionHeadTypeDto[]> {
    return await this.ammunitionHeadTypeService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOkResponse({
    type: AmmunitionHeadTypeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de le l ogive',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param('id') id: number,
  ): Promise<AmmunitionHeadTypeDto> {
    return await this.ammunitionHeadTypeService.findById(id);
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout d une ovige',
    description: 'Creattion d un nouveau type d ogive pour les munitions',
  })
  @ApiCreatedResponse({
    type: AmmunitionHeadTypeDto,
  })
  @ApiBody({
    type: CreateAmmunitionHeadTypeDto,
  })
  public async create(
    @Body() ammunitionHeadType: CreateAmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    return this.ammunitionHeadTypeService.insert(ammunitionHeadType);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un  type d ovige',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: AmmunitionHeadTypeDto,
  })
  @ApiCreatedResponse({
    type: AmmunitionHeadTypeDto,
  })
  public async edit(
    @Param('id') id: number,
    body: AmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    return await this.ammunitionHeadTypeService.edit(id, body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d une ovige',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionHeadTypeService.delete(id);
  }
}
