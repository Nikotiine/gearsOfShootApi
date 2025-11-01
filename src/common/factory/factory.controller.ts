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
import { FactoryService, FactoryTypes } from './factory.service';
import {
  CreateFactoryDto,
  FactoryDto,
  ListOfPrerequisitesFactoryDto,
  UpdateFactoryDto,
} from '../../dto/factory.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('factory')
@ApiTags('Factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [FactoryDto],
  })
  public async findAll(): Promise<FactoryDto[]> {
    return await this.factoryService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOkResponse({
    type: FactoryDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de la marque',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<FactoryDto> {
    return await this.factoryService.findById(id);
  }

  @Get(SwaggerDescription.FIND_BY_TYPE)
  @ApiOperation({
    summary: 'Liste par type',
    description: 'Retourne la liste des marques suivant leur type ',
  })
  @ApiOkResponse({
    type: [FactoryDto],
  })
  @ApiParam({
    name: SwaggerDescription.FIND_BY_TYPE_PARAM,
  })
  public async findByType(
    @Param(SwaggerDescription.FIND_BY_TYPE_PARAM) type: FactoryTypes,
  ): Promise<FactoryDto[]> {
    return await this.factoryService.findByType(type);
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesFactoryDto,
  })
  @ApiOperation({
    summary: 'Pre-requis de creation',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une marque',
  })
  public async findPrerequisitesFactoryList(): Promise<ListOfPrerequisitesFactoryDto> {
    return this.factoryService.getListOfPrerequisitesFactoryList();
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description:
      'Ajout d une nouvelle marque pour un type specifique et retourne le dto apres creation',
  })
  @ApiCreatedResponse({
    type: FactoryDto,
  })
  @ApiBody({
    type: CreateFactoryDto,
  })
  public async create(@Body() factory: CreateFactoryDto): Promise<FactoryDto> {
    return await this.factoryService.insert(factory);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: FactoryDto,
  })
  @ApiBody({
    type: UpdateFactoryDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une marque (ne pas editier son type)',
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() factory: UpdateFactoryDto,
  ): Promise<FactoryDto> {
    return await this.factoryService.edit(id, factory);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Sppression logique de la marque',
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.factoryService.delete(id);
  }
}
