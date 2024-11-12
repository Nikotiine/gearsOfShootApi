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
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';
import {
  AmmunitionHeadTypeDto,
  CreateAmmunitionHeadTypeDto,
} from '../../dto/ammunition.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('ammunition-head-type')
@ApiTags('AmmunitionHeadType')
export class AmmunitionHeadTypeController {
  constructor(
    private readonly ammunitionHeadTypeService: AmmunitionHeadTypeService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: 'Toutes les oviges',
    description: 'Retourne la liste de toutes les oviges disponible',
  })
  @ApiOkResponse({
    type: [AmmunitionHeadTypeDto],
  })
  public async findAllHeadTypes(): Promise<AmmunitionHeadTypeDto[]> {
    return await this.ammunitionHeadTypeService.findAll();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout d une ovige',
    description: 'Creattion d un nouveau type d ogive pour les munitions',
  })
  @ApiCreatedResponse({
    type: AmmunitionHeadTypeDto,
  })
  @ApiBody({
    type: CreateAmmunitionHeadTypeDto,
  })
  public async create(
    @Body() ammunitionHeadType: CreateAmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    return this.ammunitionHeadTypeService.insert(ammunitionHeadType);
  }
  @Put(':id')
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un  type d ovige',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: AmmunitionHeadTypeDto,
  })
  @ApiCreatedResponse({
    type: AmmunitionHeadTypeDto,
  })
  public async edit(
    @Param('id') id: number,
    body: AmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    return await this.ammunitionHeadTypeService.edit(id, body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d une ovige',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionHeadTypeService.delete(id);
  }
}
