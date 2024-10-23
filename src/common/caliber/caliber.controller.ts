import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CaliberService } from './caliber.service';
import { CaliberDto, CreateCaliberDto } from '../../dto/caliber.dto';

@Controller('caliber')
@ApiTags('Caliber')
export class CaliberController {
  constructor(private readonly caliberService: CaliberService) {}

  @Post('')
  @ApiOperation({
    summary: 'Ajout d un calibre',
    description: 'Ajout d un nouveau calibre en base de donnee',
  })
  @ApiCreatedResponse({
    type: CaliberDto,
  })
  @ApiBody({
    type: CreateCaliberDto,
  })
  public async create(@Body() caliber: CreateCaliberDto): Promise<CaliberDto> {
    return this.caliberService.insert(caliber);
  }

  @Get('')
  @ApiOperation({
    summary: 'Liste des calibres',
    description: 'Retourne la liste de tous les calibres disponible',
  })
  @ApiOkResponse({
    type: [CaliberDto],
  })
  public async findAllCalibers(): Promise<CaliberDto[]> {
    return await this.caliberService.findAll();
  }
}
