import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpticService } from './optic.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOpticDto, OpticDto } from '../dto/optic.dto';

@Controller('optic')
@ApiTags('Optic')
export class OpticController {
  constructor(private readonly opticService: OpticService) {}

  @Get('')
  @ApiOkResponse({
    type: [OpticDto],
  })
  @ApiOperation({
    summary: 'Liste des optiques disponible',
    description: 'Retourne la liste completes des optiques',
  })
  public async findAllOptics(): Promise<OpticDto[]> {
    return await this.opticService.findAll();
  }

  @Post('')
  @ApiCreatedResponse({
    type: OpticDto,
  })
  @ApiOperation({
    summary: 'Creation d une nouvelle optique',
    description: 'Creer une nouvelle optique et retourne son dto en reponse',
  })
  @ApiBody({
    type: CreateOpticDto,
  })
  public async create(@Body() optic: CreateOpticDto): Promise<OpticDto> {
    return await this.opticService.insert(optic);
  }
}
