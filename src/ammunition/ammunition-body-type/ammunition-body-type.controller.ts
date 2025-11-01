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
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';
import {
  AmmunitionBodyTypeDto,
  CreateAmmunitionBodyTypeDto,
} from '../../dto/ammunition.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { CaliberDto } from '../../dto/caliber.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('ammunition-body-type')
@ApiTags('AmmunitionBodyType')
export class AmmunitionBodyTypeController {
  constructor(
    private readonly ammunitionBodyTypeService: AmmunitionBodyTypeService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de toutes les douilles disponible',
  })
  @ApiOkResponse({
    type: [AmmunitionBodyTypeDto],
  })
  public async findAllBodyTypes(): Promise<AmmunitionBodyTypeDto[]> {
    return await this.ammunitionBodyTypeService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de la douille',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: AmmunitionBodyTypeDto,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<CaliberDto> {
    return await this.ammunitionBodyTypeService.findById(id);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Ajout ',
    description: 'Creattion d un nouveau type de douille pour les munitions',
  })
  @ApiCreatedResponse({
    type: AmmunitionBodyTypeDto,
  })
  @ApiBody({
    type: CreateAmmunitionBodyTypeDto,
  })
  public async create(
    @Body() ammunitionBodyType: CreateAmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    return this.ammunitionBodyTypeService.insert(ammunitionBodyType);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un type de douille',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: AmmunitionBodyTypeDto,
  })
  @ApiCreatedResponse({
    type: AmmunitionBodyTypeDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    body: AmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    return await this.ammunitionBodyTypeService.edit(id, body);
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
    description: 'Suppression logique d une douille',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionBodyTypeService.delete(id);
  }
}
