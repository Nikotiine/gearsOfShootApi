import { Controller, Get } from '@nestjs/common';
import { ReloadModeService } from './reload-mode.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeaponReloadModeDto } from '../../dto/weapon.dto';

@Controller('reload-mode')
@ApiTags('Reload mode')
export class ReloadModeController {
  constructor(private readonly reloadModeService: ReloadModeService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des diffents type d armes possible',
  })
  @ApiOkResponse({
    type: [WeaponReloadModeDto],
  })
  public async findAll(): Promise<WeaponReloadModeDto[]> {
    return await this.reloadModeService.findAll();
  }
}
