import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SoundReducerService } from './sound-reducer.service';
import {
  CreateSoundNoiseReducerDto,
  ListOfPrerequisitesSoundNoiseReducerDto,
  SoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';

@Controller('sound-reducer')
@ApiTags('Sound-reducer')
export class SoundReducerController {
  constructor(private readonly soundNoiseReducerService: SoundReducerService) {}

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

  @Get('')
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
}
