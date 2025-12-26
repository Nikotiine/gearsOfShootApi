import { Controller, Get } from '@nestjs/common';
import { BarrelTypeService } from './barrel-type.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeaponBarrelTypeDto } from '../../dto/weapon.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('barrel-type')
@ApiTags('BarrelType')
export class BarrelTypeController {
  constructor(private readonly barrelTypeService: BarrelTypeService) {}

  @Get('')
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste de toutes les douilles disponible',
  })
  @ApiOkResponse({
    type: [WeaponBarrelTypeDto],
  })
  public async findAll(): Promise<WeaponBarrelTypeDto[]> {
    return await this.barrelTypeService.findAll();
  }
}
