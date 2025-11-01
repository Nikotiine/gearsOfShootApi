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
import { ThreadedSizeService } from './threaded-size.service';
import {
  CreateThreadedSizeDto,
  ThreadedSizeDto,
} from '../../dto/threaded-size.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { Roles } from '../../decorator/roles.decorator';
import { UserRoles } from '../../enum/user-roles.enum';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/strategy/roles.guard';

@Controller('threaded-size')
@ApiTags('Threaded-size')
export class ThreadedSizeController {
  constructor(private readonly threadedSieService: ThreadedSizeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOkResponse({
    type: [ThreadedSizeDto],
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des filletage disponible',
  })
  public async findAllThreadedSize(): Promise<ThreadedSizeDto[]> {
    return await this.threadedSieService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne le detail du filletage',
  })
  @ApiOkResponse({
    type: ThreadedSizeDto,
  })
  public async findById(@Param('id') id: number): Promise<ThreadedSizeDto> {
    return this.threadedSieService.findById(id);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajouter un nouveux type de filetage arme ou rds ',
  })
  @ApiCreatedResponse({
    type: ThreadedSizeDto,
  })
  @ApiBody({
    type: CreateThreadedSizeDto,
  })
  public async create(
    @Body() threadedSize: CreateThreadedSizeDto,
  ): Promise<ThreadedSizeDto> {
    return await this.threadedSieService.insert(threadedSize);
  }

  @Put(SwaggerDescription.ID)
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiCreatedResponse({
    type: ThreadedSizeDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une taille de filletage',
  })
  @ApiBody({
    type: ThreadedSizeDto,
  })
  public async edit(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    size: ThreadedSizeDto,
  ): Promise<ThreadedSizeDto> {
    return await this.threadedSieService.edit(id, size);
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
    description: 'Soft delete  d un  filletage',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.threadedSieService.delete(id);
  }
}
