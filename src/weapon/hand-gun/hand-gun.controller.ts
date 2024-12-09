import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HandGunService } from './hand-gun.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import {
  CreateHandGunDto,
  HandGunDto,
  UpdateHandGunDto,
} from '../../dto/hand-gun.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('hand-gun')
@ApiTags('Hand-Gun')
export class HandGunController {
  constructor(private readonly handGunService: HandGunService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des arme de poings',
  })
  @ApiOkResponse({
    type: [HandGunDto],
  })
  public async findAll(): Promise<HandGunDto[]> {
    return await this.handGunService.findAll();
  }

  @Get(SwaggerDescription.FIND_BY_ID)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_ID_SUMMARY,
    description: 'Retourne l arme de poing trouver par son id',
  })
  @ApiOkResponse({
    type: HandGunDto,
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async findById(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<HandGunDto> {
    return this.handGunService.findById(id);
  }

  @Get(SwaggerDescription.FIND_BY_CATEGORY)
  @ApiOperation({
    summary: SwaggerDescription.FIND_BY_CATEGORY_SUMMARY,
    description: 'Retourne la liste des arme de poings filtree par categories',
  })
  @ApiOkResponse({
    type: [HandGunDto],
  })
  @ApiParam({
    name: SwaggerDescription.FIND_BY_CATEGORY_PARAM,
  })
  public async findAllByCategory(
    @Param(SwaggerDescription.FIND_BY_CATEGORY_PARAM) categoryId: number,
  ): Promise<HandGunDto[]> {
    return this.handGunService.findAllByCategory(categoryId);
  }

  @Post()
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Ajout d une nouvelle arme de poing',
  })
  @ApiCreatedResponse({
    type: HandGunDto,
  })
  @ApiBody({
    type: CreateHandGunDto,
  })
  public async create(@Body() handgun: CreateHandGunDto): Promise<HandGunDto> {
    return this.handGunService.insert(handgun);
  }

  @Put(SwaggerDescription.ID)
  @ApiOperation({
    summary: SwaggerDescription.UPDATE_SUMMARY,
    description: 'Edition d une arme de poing',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  @ApiBody({
    type: UpdateHandGunDto,
  })
  @ApiCreatedResponse({
    type: HandGunDto,
  })
  public async update(
    @Param(SwaggerDescription.ID_PARAM) id: number,
    @Body() handgun: UpdateHandGunDto,
  ): Promise<HandGunDto> {
    return this.handGunService.update(id, handgun);
  }

  @Delete(SwaggerDescription.ID)
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.DELETE_SUMMARY,
    description: 'Suppresion logique de l arme de poing',
  })
  @ApiParam({
    name: SwaggerDescription.ID_PARAM,
  })
  public async delete(
    @Param(SwaggerDescription.ID_PARAM) id: number,
  ): Promise<ApiDeleteResponseDto> {
    return this.handGunService.delete(id);
  }
}
