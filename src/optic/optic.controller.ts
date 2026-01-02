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
import { OpticService } from './optic.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOpticDto, OpticDto, UpdateOpticDto } from '../dto/optic.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { SwaggerDescription } from '../enum/swagger-description.enum';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRoles } from '../enum/user-roles.enum';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { OpticFilter } from './filters/optic.filter';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../decorator/paginated-response.decorator';
import { QueryFilter } from '../decorator/query-filter.decorator';

import { ReqQueryFilter } from '../decorator/req-query-filter.decorator';

@Controller('optic')
@ApiTags('Optic')
export class OpticController {
  constructor(private readonly opticService: OpticService) {}

  /**
   * Récupère la liste paginée des optiques.
   *
   * Cette route permet de retourner l’ensemble des optiques en appliquant
   * éventuellement un filtre fourni via les paramètres de requête.
   *
   * Les métadonnées Swagger associées :
   * - `@ApiPaginatedResponse(OpticDto)`: indique que la réponse est paginée
   *   et de type `OpticDto`.
   * - `@ApiOperation`: fournit le résumé et la description pour la documentation Swagger.
   * - `@QueryFilter(OpticFilter)`: ajoute automatiquement au Swagger un schéma
   *   pour les filtres transmis sous forme d’objet dans la query (`filters[...]`).
   *
   * Le décorateur `@ReqQueryFilter()` extrait automatiquement l’objet `filters`
   * depuis la query (`req.query.filters`) et le transforme en instance d’`OpticFilter`.
   *
   * @param filters - Instance de `OpticFilter` construite à partir de `req.query.filters`.
   * @returns Une réponse paginée contenant la liste des optiques.
   */
  @Get(SwaggerDescription.FIND_ALL)
  @ApiPaginatedResponse(OpticDto)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des optiques',
  })
  @QueryFilter(OpticFilter)
  public async findAllOptics(
    @ReqQueryFilter() filters: OpticFilter,
  ): Promise<PaginatedResponseDto<OpticDto>> {
    return await this.opticService.findAll(filters);
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
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<OpticDto> {
    return await this.opticService.findById(id);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: OpticDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Creer une nouvelle optique et retourne son dto en reponse',
  })
  @ApiBody({
    type: CreateOpticDto,
  })
  public async create(@Body() optic: CreateOpticDto): Promise<OpticDto> {
    return await this.opticService.insert(optic);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
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
    return await this.opticService.update(id, optic);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
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
