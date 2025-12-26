import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OpticReadyPlateService } from './optic-ready-plate.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { CreateOpticReadyPlateDto, OpticReadyPlateDto } from '../../dto/optic-ready-plate.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('optic-ready-plate')
@ApiTags('Optic-ready-plate')
export class OpticReadyPlateController {
  constructor(
    private readonly opticReadyPlateService: OpticReadyPlateService,
  ) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des type de detente d arme',
  })
  @ApiOkResponse({
    type: [OpticReadyPlateDto],
  })
  public async findAll(): Promise<OpticReadyPlateDto[]> {
    return await this.opticReadyPlateService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOkResponse({
    type: OpticReadyPlateDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de la plaque optic ready',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<OpticReadyPlateDto> {
    return await this.opticReadyPlateService.findById(id);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle plaque optic ready',
  })
  @ApiCreatedResponse({
    type: OpticReadyPlateDto,
  })
  @ApiBody({
    type: CreateOpticReadyPlateDto,
  })
  public async create(
    @Body() plate: CreateOpticReadyPlateDto,
  ): Promise<OpticReadyPlateDto> {
    return await this.opticReadyPlateService.insert(plate);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: OpticReadyPlateDto,
  })
  @ApiBody({
    type: OpticReadyPlateDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une plaque OR',
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() plate: OpticReadyPlateDto,
  ): Promise<OpticReadyPlateDto> {
    return await this.opticReadyPlateService.edit(id, plate);
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
    summary: 'Suppression logique',
    description: 'Sppression logique de la marque',
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.opticReadyPlateService.delete(id);
  }
}
