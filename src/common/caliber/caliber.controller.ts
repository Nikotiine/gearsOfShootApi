import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
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
}
