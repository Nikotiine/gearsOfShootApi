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

@Controller('optic-type')
@ApiTags('OpticType')
export class OpticTypeController {
  constructor(private readonly opticTypeService: OpticTypeService) {}

  @Get('')
  @ApiOperation({
    summary: 'Liste complete',
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

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition un type d optique',
  })
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  public async edit(
    @Param('id') id: number,
    type: OpticTypeDto,
  ): Promise<OpticTypeDto> {
    return await this.opticTypeService.edit(id, type);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique un type d optique',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.opticTypeService.delete(id);
  }
}
