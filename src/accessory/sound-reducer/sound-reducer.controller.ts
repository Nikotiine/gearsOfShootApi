import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
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
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';
import { QueryFilter } from '../../decorator/query-filter.decorator';
import { SoundNoiseFilter } from './filters/sound-noise.reducer.filter';
import { ReqQueryFilter } from '../../decorator/req-query-filter.decorator';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../../decorator/paginated-response.decorator';

@Controller('sound-reducer')
@ApiTags('Sound-reducer')
export class SoundReducerController {
  constructor(private readonly soundNoiseReducerService: SoundReducerService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiPaginatedResponse(SoundNoiseReducerDto)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les reducteurs de son disponible',
  })
  @QueryFilter(SoundNoiseFilter)
  public async findAll(
    @ReqQueryFilter() filters: SoundNoiseFilter,
  ): Promise<PaginatedResponseDto<SoundNoiseReducerDto>> {
    return await this.soundNoiseReducerService.findAll(filters);
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
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
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
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un reducteur de son',
  })
  @ApiCreatedResponse({
    type: SoundNoiseReducerDto,
    description: 'Retourne le RDS sous la forme de SoundNoiseReducerDto',
  })
  @ApiBody({
    type: UpdateSoundNoiseReducerDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() rds: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    return await this.soundNoiseReducerService.update(id, rds);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique d un reducteur de son',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
    description: SwaggerDescription.DELETE_DESCRIPTION,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.soundNoiseReducerService.delete(id);
  }
}
