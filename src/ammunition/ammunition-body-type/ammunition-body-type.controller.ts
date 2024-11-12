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
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';
import {
  AmmunitionBodyTypeDto,
  CreateAmmunitionBodyTypeDto,
} from '../../dto/ammunition.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('ammunition-body-type')
@ApiTags('AmmunitionBodyType')
export class AmmunitionBodyTypeController {
  constructor(
    private readonly ammunitionBodyTypeService: AmmunitionBodyTypeService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: 'Toutes les douilles',
    description: 'Retourne la liste de toutes les douilles disponible',
  })
  @ApiOkResponse({
    type: [AmmunitionBodyTypeDto],
  })
  public async findAllBodyTypes(): Promise<AmmunitionBodyTypeDto[]> {
    return await this.ammunitionBodyTypeService.findAll();
  }

  @Post('')
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

  @Put(':id')
  @ApiOperation({
    summary: 'Editio',
    description: 'Editio d un  type de douille pour les munitions',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: AmmunitionBodyTypeDto,
  })
  @ApiCreatedResponse({
    type: AmmunitionBodyTypeDto,
  })
  public async edit(
    @Param('id') id: number,
    body: AmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    return await this.ammunitionBodyTypeService.edit(id, body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Suppression logique d une douille',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.ammunitionBodyTypeService.delete(id);
  }
}
