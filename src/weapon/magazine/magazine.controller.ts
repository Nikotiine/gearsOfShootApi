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
import { MagazineService } from './magazine.service';
import {
  CreateWeaponMagazineDto,
  UpdateWeaponMagazineDto,
  WeaponMagazineDto,
} from '../../dto/weapon-magazine.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';
import {
  ApiPaginatedResponse,
  PaginatedResponseDto,
} from '../../decorator/paginated-response.decorator';
import { QueryFilter } from '../../decorator/query-filter.decorator';
import { MagazineFilter } from './filters/magazine.filter';
import { ReqQueryFilter } from '../../decorator/req-query-filter.decorator';

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les chargeurs disponible',
  })
  @ApiPaginatedResponse(WeaponMagazineDto)
  @QueryFilter(MagazineFilter)
  public async findAll(
    @ReqQueryFilter() filters: MagazineFilter,
  ): Promise<PaginatedResponseDto<WeaponMagazineDto>> {
    return await this.magazineService.findAll(filters);
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du chargeur',
  })
  @ApiOkResponse({
    type: WeaponMagazineDto,
  })
  public async findById(@Param('id') id: number): Promise<WeaponMagazineDto> {
    return await this.magazineService.findById(id);
  }

  @Get(SwaggerDescription.FIND_BY_FACTORY)
  @ApiParam({
    name: SwaggerDescription.FIND_BY_FACTORY_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_FACTORY_SUMMARY,
    description: 'Retourne les chargeurs filtres par marque',
  })
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  public async findByFactory(
    @Param(SwaggerDescription.FIND_BY_FACTORY_PARAM) factoryName: string,
  ): Promise<WeaponMagazineDto[]> {
    return this.magazineService.findByFactory(factoryName);
  }

  @Get(SwaggerDescription.FIND_BY_CATEGORY)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne les chargeurs filtres par categories',
  })
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  @ApiParam({
    name: SwaggerDescription.FIND_BY_CATEGORY_PARAM,
  })
  public async findByCategory(
    @Param(SwaggerDescription.FIND_BY_CATEGORY_PARAM) category: string,
  ): Promise<WeaponMagazineDto[]> {
    return await this.magazineService.findByCategory(category);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajoute un nouveau chargeur en bdd et le retoune',
  })
  @ApiBody({
    type: CreateWeaponMagazineDto,
  })
  @ApiCreatedResponse({
    type: WeaponMagazineDto,
  })
  public async create(
    @Body() magazine: CreateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    return await this.magazineService.insert(magazine);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: WeaponMagazineDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un chargeur',
  })
  @ApiBody({
    type: UpdateWeaponMagazineDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() magazine: UpdateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    return await this.magazineService.edit(id, magazine);
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
    description: 'Suppression logique  d un chargeur',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.magazineService.delete(id);
  }
}
