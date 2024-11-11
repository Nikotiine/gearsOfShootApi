import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OpticTypeService } from './optic-type.service';
import { CreateOpticTypeDto, OpticTypeDto } from '../../dto/optic.dto';

@Controller('optic-type')
@ApiTags('OpticType')
export class OpticTypeController {
  constructor(private readonly opticTypeService: OpticTypeService) {}

  @Post('')
  @ApiCreatedResponse({
    type: OpticTypeDto,
  })
  @ApiOperation({
    summary: 'Ajout d un type d optique',
    description: 'Ajouter un nouveau type d optique',
  })
  @ApiBody({
    type: CreateOpticTypeDto,
  })
  public async create(@Body() type: CreateOpticTypeDto): Promise<OpticTypeDto> {
    return await this.opticTypeService.insert(type);
  }
}
