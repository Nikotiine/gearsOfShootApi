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
import { RiffleService } from './riffle.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import {
  CreateRiffleDto,
  RiffleDto,
  UpdateRiffleDto,
} from '../../dto/riffle.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('riffle')
@ApiTags('Riffle')
export class RiffleController {
  constructor(private readonly riffleService: RiffleService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des armes longues',
  })
  @ApiOkResponse({
    type: [RiffleDto],
  })
  public async findAll(): Promise<RiffleDto[]> {
    return await this.riffleService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne l arme longue trouver par son id',
  })
  @ApiOkResponse({
    type: RiffleDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<RiffleDto> {
    return this.riffleService.findById(id);
  }

  @Get(SwaggerDescription.FIND_BY_CATEGORY)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne la liste des arme de poings filtree par categories',
  })
  @ApiOkResponse({
    type: [RiffleDto],
  })
  @ApiParam({
    name: SwaggerDescription.FIND_BY_CATEGORY_PARAM,
  })
  public async findAllByCategory(
    @Param(SwaggerDescription.FIND_BY_CATEGORY_PARAM) category: string,
  ): Promise<RiffleDto[]> {
    return this.riffleService.findAllByCategory(category);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle arme longue',
  })
  @ApiCreatedResponse({
    type: RiffleDto,
  })
  @ApiBody({
    type: CreateRiffleDto,
  })
  public async create(@Body() handgun: CreateRiffleDto): Promise<RiffleDto> {
    return this.riffleService.insert(handgun);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une arme longue',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateRiffleDto,
  })
  @ApiCreatedResponse({
    type: RiffleDto,
  })
  public async update(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() handgun: UpdateRiffleDto,
  ): Promise<RiffleDto> {
    return this.riffleService.update(id, handgun);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppresion logique de l arme longue',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return this.riffleService.delete(id);
  }
}
