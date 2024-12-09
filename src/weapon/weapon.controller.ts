import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeaponService } from './weapon.service';
import { ListOfPrerequisitesWeaponDto } from '../dto/weapon.dto';

@Controller('weapon')
@ApiTags('Weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesWeaponDto,
  })
  @ApiOperation({
    summary: 'Liste des pre-requis',
    description:
      'Retourne la liste des pre-requis necesssaire a la creation d une arme',
  })
  public async findPrerequisitesWeaponList(): Promise<ListOfPrerequisitesWeaponDto> {
    return this.weaponService.getListOfPrerequisitesWeaponList();
  }
}
