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
import { SoundReducerService } from './sound-reducer.service';
import {
  CreateSoundNoiseReducerDto,
  ListOfPrerequisitesSoundNoiseReducerDto,
  SoundNoiseReducerDto,
  UpdateSoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('sound-reducer')
@ApiTags('Sound-reducer')
export class SoundReducerController {
  constructor(private readonly soundNoiseReducerService: SoundReducerService) {}

  @Get('all')
  @ApiOkResponse({
    type: [SoundNoiseReducerDto],
  })
  @ApiOperation({
    summary: 'Liste des RDS',
    description: 'Retourne la liste de tous les reducteur de son disponible',
  })
  public async findAll(): Promise<SoundNoiseReducerDto[]> {
    return await this.soundNoiseReducerService.findAll();
  }

  @Get('by/:id')
  @ApiOperation({
    summary: 'Par id',
    description: 'Retourne le detail du rds selectionner avec son id',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiOkResponse({
    type: SoundNoiseReducerDto,
  })
  public async findById(
    @Param('id') id: number,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.findById(id);
  }

  @Get('prerequisites')
  @ApiOperation({
    summary: 'Liste des prerequis',
    description:
      'Retourne la liste des pre requis pour la creation d un nouveau rds',
  })
  @ApiOkResponse({
    type: ListOfPrerequisitesSoundNoiseReducerDto,
  })
  public async findPrerequisitesSoundReducerList(): Promise<ListOfPrerequisitesSoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.getListOfPrerequisitesSoundNoiseReducerList();
  }

  @Post('')
  @ApiCreatedResponse({
    type: SoundNoiseReducerDto,
  })
  @ApiOperation({
    summary: 'Ajout d un RDS',
    description: 'Ajout d un nouveau reducteur de son en base de donnee',
  })
  @ApiBody({
    type: CreateSoundNoiseReducerDto,
  })
  public async create(
    @Body() soundReducer: CreateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.insert(soundReducer);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un reducteur de son',
  })
  @ApiCreatedResponse({
    type: SoundNoiseReducerDto,
  })
  @ApiBody({
    type: UpdateSoundNoiseReducerDto,
  })
  @ApiParam({
    name: 'id',
  })
  public async edit(
    @Param('id') id: number,
    rds: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.edit(id, rds);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d un reducteur de son',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.soundNoiseReducerService.delete(id);
  }
}
