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
import {
  CreateOpticDto,
  ListOfPrerequisitesOpticDto,
  OpticDto,
  UpdateOpticDto,
} from '../dto/optic.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';

@Controller('optic')
@ApiTags('Optic')
export class OpticController {
  constructor(private readonly opticService: OpticService) {}

  @Get('all')
  @ApiOkResponse({
    type: [OpticDto],
  })
  @ApiOperation({
    summary: 'Liste complete',
    description: 'Retourne la liste completes des optiques',
  })
  public async findAllOptics(): Promise<OpticDto[]> {
    return await this.opticService.findAll();
  }

  @Get('by/:id')
  @ApiOkResponse({
    type: OpticDto,
  })
  @ApiOperation({
    summary: 'Par id',
    description: 'Retourne le detail de l optique',
  })
  @ApiParam({
    name: 'id',
  })
  public async findById(@Param('id') id: number): Promise<OpticDto> {
    return await this.opticService.findById(id);
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesOpticDto,
  })
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une optique',
  })
  public async findPrerequisitesOpticList(): Promise<ListOfPrerequisitesOpticDto> {
    return await this.opticService.getListOfPrerequisitesOpticDto();
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

  @Put(':id')
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition de l optique',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: UpdateOpticDto,
  })
  @ApiCreatedResponse({
    type: OpticDto,
  })
  public async edit(
    @Param('id') id: number,
    optic: UpdateOpticDto,
  ): Promise<OpticDto> {
    return await this.opticService.edit(id, optic);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique de l optique',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.opticService.delete(id);
  }
}
