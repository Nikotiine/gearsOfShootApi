import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MagazineService } from './magazine.service';
import {
  CreateWeaponMagazineDto,
  ListOfPrerequisitesWeaponMagazineDto,
  WeaponMagazineDto,
} from '../../dto/weapon-magazine.dto';

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  constructor(private readonly magzineService: MagazineService) {}

  @Get('all')
  @ApiOkResponse({
    type: [WeaponMagazineDto],
  })
  @ApiOperation({
    summary: 'Liste des chargeurs',
    description: 'Retourne la liste de tous les chargeurs disponible',
  })
  public async findAll(): Promise<WeaponMagazineDto[]> {
    return await this.magzineService.findAll();
  }

  @Get('prerequisites')
  @ApiOkResponse({
    type: ListOfPrerequisitesWeaponMagazineDto,
  })
  @ApiOperation({
    summary: 'Liste des prerequis',
    description:
      'Retourne la liste des pre requis de creation d un nouveau chargeur',
  })
  public async findPrerequisitesWeaponMagazineList(): Promise<ListOfPrerequisitesWeaponMagazineDto> {
    return await this.magzineService.getListOfPrerequisitesWeaponMagazineList();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout de chargeur',
    description: 'Ajoute un nouveau chargeur en bdd et le retoune',
  })
  @ApiBody({
    type: CreateWeaponMagazineDto,
  })
  @ApiCreatedResponse({
    type: WeaponMagazineDto,
  })
  public async create(
    @Body() magazine: CreateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    return await this.magzineService.insert(magazine);
  }
}
