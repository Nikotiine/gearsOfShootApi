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
import { OpticCollarService } from './optic-collar.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateOpticCollarDto,
  OpticCollarDto,
  UpdateOpticCollarDto,
} from '../../dto/optic-collar.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('optic-collar')
@ApiTags('Optic-Collar')
export class OpticCollarController {
  constructor(private readonly opticCollarService: OpticCollarService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOkResponse({
    type: [OpticCollarDto],
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Liste complete des colliers d optique',
  })
  public async findAll(): Promise<OpticCollarDto[]> {
    return this.opticCollarService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du collier optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOkResponse({
    type: OpticCollarDto,
  })
  public async findById(@Param('id') id: number): Promise<OpticCollarDto> {
    return this.opticCollarService.findById(id);
  }

  @Post('')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiBody({
    type: CreateOpticCollarDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Creation d un nouveau collier d optique',
  })
  @ApiCreatedResponse({
    type: OpticCollarDto,
  })
  public async create(
    @Body() collar: CreateOpticCollarDto,
  ): Promise<OpticCollarDto> {
    return this.opticCollarService.insert(collar);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition du collier optique',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateOpticCollarDto,
  })
  @ApiCreatedResponse({
    type: OpticCollarDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() collar: UpdateOpticCollarDto,
  ): Promise<OpticCollarDto> {
    return this.opticCollarService.edit(id, collar);
  }

  @Delete(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppression logique du collier optique',
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
    return this.opticCollarService.delete(id);
  }
}
