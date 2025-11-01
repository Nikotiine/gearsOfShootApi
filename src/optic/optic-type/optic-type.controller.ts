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
import { OpticTypeService } from './optic-type.service';
import { CreateOpticTypeDto, OpticTypeDto } from '../../dto/optic.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('optic-type')
@ApiTags('OpticType')
export class OpticTypeController {
  constructor(private readonly opticTypeService: OpticTypeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des types d optique',
  })
  @ApiOkResponse({
    type: [OpticTypeDto],
  })
  public async findAll(): Promise<OpticTypeDto[]> {
    return await this.opticTypeService.findAll();
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajouter un nouveau type d optique',
  })
  @ApiBody({
    type: CreateOpticTypeDto,
  })
  public async create(@Body() type: CreateOpticTypeDto): Promise<OpticTypeDto> {
    return await this.opticTypeService.insert(type);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition un type d optique',
  })
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    type: OpticTypeDto,
  ): Promise<OpticTypeDto> {
    return await this.opticTypeService.edit(id, type);
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
    description: 'Suppression logique un type d optique',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return await this.opticTypeService.delete(id);
  }
}
