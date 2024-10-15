import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
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
}
