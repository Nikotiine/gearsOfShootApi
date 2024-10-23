import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AmmunitionBodyTypeService } from './ammunition-body-type.service';
import {
  AmmunitionBodyTypeDto,
  CreateAmmunitionBodyTypeDto,
} from '../../dto/ammunition.dto';

@Controller('ammunition-body-type')
@ApiTags('AmmunitionBodyType')
export class AmmunitionBodyTypeController {
  constructor(
    private readonly ammunitionBodyTypeService: AmmunitionBodyTypeService,
  ) {}

  @Post('')
  @ApiOperation({
    summary: 'Ajout d un type de douille',
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
}
