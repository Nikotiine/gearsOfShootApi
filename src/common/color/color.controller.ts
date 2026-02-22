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
import { ColorService } from './color.service';

import { ColorDto, CreateColorDto } from '../../dto/color.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('color')
@ApiTags('Color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la listes de toutes les marques sans distinction',
  })
  @ApiOkResponse({
    type: [ColorDto],
  })
  public async findAll(): Promise<ColorDto[]> {
    return await this.colorService.findAll();
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
    type: ColorDto,
  })
  public async findById(@Param('id') id: number): Promise<ColorDto> {
    return this.colorService.findById(id);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajoute une nouvelle couleur',
  })
  @ApiCreatedResponse({
    type: ColorDto,
  })
  @ApiBody({
    type: CreateColorDto,
  })
  public async create(@Body() color: CreateColorDto): Promise<ColorDto> {
    return await this.colorService.insert(color);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: ColorDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une couleur',
  })
  @ApiBody({
    type: ColorDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() color: ColorDto,
  ): Promise<ColorDto> {
    return this.colorService.edit(id, color);
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
    description: 'Sppression logique de la couleur',
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.colorService.delete(id);
  }
}
