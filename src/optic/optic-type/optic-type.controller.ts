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
import { OpticTypeService } from './optic-type.service';
import { CreateOpticTypeDto, OpticTypeDto } from '../../dto/optic.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('optic-type')
@ApiTags('OpticType')
export class OpticTypeController {
  constructor(private readonly opticTypeService: OpticTypeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des types d optique',
  })
  @ApiOkResponse({
    type: [OpticTypeDto],
  })
  public async findAll(): Promise<OpticTypeDto[]> {
    return await this.opticTypeService.findAll();
  }

  @Post('')
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: 'Ajout',
    description: 'Ajouter un nouveau type d optique',
  })
  @ApiBody({
    type: CreateOpticTypeDto,
  })
  public async create(@Body() type: CreateOpticTypeDto): Promise<OpticTypeDto> {
    return await this.opticTypeService.insert(type);
  }

  @Put(SwaggerDescription.ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition un type d optique',
  })
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    type: OpticTypeDto,
  ): Promise<OpticTypeDto> {
    return await this.opticTypeService.edit(id, type);
  }

  @Delete(SwaggerDescription.ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique un type d optique',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.opticTypeService.delete(id);
  }
}
