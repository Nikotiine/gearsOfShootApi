import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OpticService } from './optic.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOpticDto, OpticDto, UpdateOpticDto } from '../dto/optic.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { SwaggerDescription } from '../enum/swagger-description.enum';

@Controller('optic')
@ApiTags('Optic')
export class OpticController {
  constructor(private readonly opticService: OpticService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOkResponse({
    type: [OpticDto],
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste completes des optiques',
  })
  public async findAllOptics(): Promise<OpticDto[]> {
    return await this.opticService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOkResponse({
    type: OpticDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de l optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(@Param('id') id: number): Promise<OpticDto> {
    return await this.opticService.findById(id);
  }

  @Post('')
  @ApiCreatedResponse({
    type: OpticDto,
  })
  @ApiOperation({
    summary: 'Creation d une nouvelle optique',
    description: 'Creer une nouvelle optique et retourne son dto en reponse',
  })
  @ApiBody({
    type: CreateOpticDto,
  })
  public async create(@Body() optic: CreateOpticDto): Promise<OpticDto> {
    return await this.opticService.insert(optic);
  }

  @Put(SwaggerDescription.ID)
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition de l optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateOpticDto,
  })
  @ApiCreatedResponse({
    type: OpticDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() optic: UpdateOpticDto,
  ): Promise<OpticDto> {
    return await this.opticService.edit(id, optic);
  }

  @Delete(SwaggerDescription.ID)
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique de l optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.opticService.delete(id);
  }
}
