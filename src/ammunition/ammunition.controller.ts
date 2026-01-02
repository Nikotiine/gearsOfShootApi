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
import { AmmunitionService } from './ammunition.service';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  UpdateAmmunitionDto,
} from '../dto/ammunition.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { SwaggerDescription } from '../enum/swagger-description.enum';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRoles } from '../enum/user-roles.enum';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { AmmunitionFilter } from './filters/ammunition.filter';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../decorator/paginated-response.decorator';
import { ReqQueryFilter } from '../decorator/req-query-filter.decorator';
import { QueryFilter } from '../decorator/query-filter.decorator';

@Controller('ammunition')
@ApiTags('Ammunition')
export class AmmunitionController {
  constructor(private readonly ammunitionService: AmmunitionService) {}

  /**
   * Récupère la munitions selon son id.
   * @param {number} id identifiant de la munition
   * @returns {Promise<AmmunitionDto>} Le DTO de la munition
   */
  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne la munition trouver par son id',
  })
  @ApiOkResponse({
    type: AmmunitionDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<AmmunitionDto> {
    return this.ammunitionService.findById(id);
  }

  /**
   * Récupère la liste paginée des munitions selon les filtres fournis.
   *
   * ### Filtres disponibles :
   * - `category`: nom de la catégorie (ex. "B", "C", etc.)
   * - `factory`: nom du fabricant (ex. "Glock", "Winchester")
   * - `caliber`: nom du calibre (ex. "9mm", "5.56")
   * - `limit`: nombre maximum de résultats (défaut : 10)
   * - `offset`: index de départ de la pagination (défaut : 0)
   * - 'name' : nom du modele
   * - 'reference' : reference du produit
   *
   * @param {AmmunitionFilter} filters - Objet contenant les filtres et paramètres de pagination.
   * @returns {Promise<PaginatedResponseDto<AmmunitionDto>>} Une liste paginée de munitions.
   */
  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @ApiPaginatedResponse(AmmunitionDto)
  @QueryFilter(AmmunitionFilter)
  public async findAll(
    @ReqQueryFilter() filters: AmmunitionFilter,
  ): Promise<PaginatedResponseDto<AmmunitionDto>> {
    return this.ammunitionService.findAll(filters);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Creation d une nouvelle munition',
  })
  @ApiCreatedResponse({
    type: AmmunitionDto,
  })
  @ApiBody({
    type: CreateAmmunitionDto,
  })
  public async create(
    @Body() ammunition: CreateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    return await this.ammunitionService.insert(ammunition);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateAmmunitionDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une munition',
  })
  @ApiCreatedResponse({
    type: AmmunitionDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    return await this.ammunitionService.update(id, ammunition);
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
    description: 'Suppression logique d une munition',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionService.delete(id);
  }
}
