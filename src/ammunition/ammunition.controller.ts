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

@Controller('ammunition')
@ApiTags('Ammunition')
export class AmmunitionController {
  constructor(private readonly ammunitionService: AmmunitionService) {}

  @Get('by/caliber/:id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Filtre par calibre',
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @ApiOkResponse({
    type: [AmmunitionDto],
  })
  public async findByCaliber(
    @Param('caliberId') caliberId: number,
  ): Promise<AmmunitionDto[]> {
    return this.ammunitionService.findByCaliber(caliberId);
  }

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

  @Get(SwaggerDescription.FIND_BY_CATEGORY)
  @ApiParam({
    name: SwaggerDescription.FIND_BY_CATEGORY_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne la liste des munitions filtre par calibre',
  })
  @ApiOkResponse({
    type: [AmmunitionDto],
  })
  public async findByCategory(
    @Param('category') category: string,
  ): Promise<AmmunitionDto[]> {
    return this.ammunitionService.findByCategory(category);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Creation d une nouvelle munition en base de donnée',
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
    description: 'Edition d une  munition en base de donnée',
  })
  @ApiCreatedResponse({
    type: AmmunitionDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    return await this.ammunitionService.edit(id, ammunition);
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
    description: 'Suppression logique d une  munition en base de donnée',
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
