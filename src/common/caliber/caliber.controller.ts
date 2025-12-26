import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CaliberService } from './caliber.service';
import { CaliberDto, CreateCaliberDto } from '../../dto/caliber.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('caliber')
@ApiTags('Caliber')
export class CaliberController {
  constructor(private readonly caliberService: CaliberService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de tous les calibres disponible',
  })
  @ApiOkResponse({
    type: [CaliberDto],
  })
  public async findAllCalibers(): Promise<CaliberDto[]> {
    return await this.caliberService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOkResponse({
    type: CaliberDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail de l optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(@Param('id') id: number): Promise<CaliberDto> {
    return await this.caliberService.findById(id);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d un nouveau calibre en base de donnee',
  })
  @ApiCreatedResponse({
    type: CaliberDto,
  })
  @ApiBody({
    type: CreateCaliberDto,
  })
  public async create(@Body() caliber: CreateCaliberDto): Promise<CaliberDto> {
    return this.caliberService.insert(caliber);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: CaliberDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d un  calibre',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: CaliberDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() caliber: CaliberDto,
  ): Promise<CaliberDto> {
    return await this.caliberService.edit(id, caliber);
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
    description: 'Soft delete  d un  calibre',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.caliberService.delete(id);
  }
}
