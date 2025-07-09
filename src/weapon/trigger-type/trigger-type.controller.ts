import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TriggerTypeService } from './trigger-type.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { WeaponTriggerTypeDto } from '../../dto/weapon.dto';

@Controller('trigger-type')
@ApiTags('Trigger-type')
export class TriggerTypeController {
  constructor(private readonly triggerTypeService: TriggerTypeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des type de detente d arme',
  })
  @ApiOkResponse({
    type: [WeaponTriggerTypeDto],
  })
  public async findAll(): Promise<WeaponTriggerTypeDto[]> {
    return await this.triggerTypeService.findAll();
  }
}
