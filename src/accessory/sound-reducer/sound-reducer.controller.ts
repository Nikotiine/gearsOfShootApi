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
  SoundNoiseReducerDto,
  UpdateSoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('sound-reducer')
@ApiTags('Sound-reducer')
export class SoundReducerController {
  constructor(private readonly soundNoiseReducerService: SoundReducerService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOkResponse({
    type: [SoundNoiseReducerDto],
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les reducteurs de son disponible',
  })
  public async findAll(): Promise<SoundNoiseReducerDto[]> {
    return await this.soundNoiseReducerService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du rds selectionner avec son id',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: SoundNoiseReducerDto,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.findById(id);
  }

  @Post('')
  @ApiCreatedResponse({
    type: SoundNoiseReducerDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
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

  @Put(SwaggerDescription.ID)
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un reducteur de son',
  })
  @ApiCreatedResponse({
    type: SoundNoiseReducerDto,
  })
  @ApiBody({
    type: UpdateSoundNoiseReducerDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    rds: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.edit(id, rds);
  }

  @Delete(SwaggerDescription.ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique d un reducteur de son',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.soundNoiseReducerService.delete(id);
  }
}
