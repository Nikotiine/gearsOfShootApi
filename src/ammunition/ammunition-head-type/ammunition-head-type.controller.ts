import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AmmunitionHeadTypeService } from './ammunition-head-type.service';
import {
  AmmunitionHeadTypeDto,
  CreateAmmunitionHeadTypeDto,
} from '../../dto/ammunition.dto';

@Controller('ammunition-head-type')
@ApiTags('AmmunitionHeadType')
export class AmmunitionHeadTypeController {
  constructor(
    private readonly ammunitionHeadTypeService: AmmunitionHeadTypeService,
  ) {}

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
}
