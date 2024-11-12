import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CaliberService } from './caliber.service';
import { CaliberDto, CreateCaliberDto } from '../../dto/caliber.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('caliber')
@ApiTags('Caliber')
export class CaliberController {
  constructor(private readonly caliberService: CaliberService) {}

  @Get('')
  @ApiOperation({
    summary: 'Liste complete',
    description: 'Retourne la liste de tous les calibres disponible',
  })
  @ApiOkResponse({
    type: [CaliberDto],
  })
  public async findAllCalibers(): Promise<CaliberDto[]> {
    return await this.caliberService.findAll();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout',
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

  @Put(':id')
  @ApiCreatedResponse({
    type: CaliberDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d un  calibre',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: CaliberDto,
  })
  public async edit(
    @Param('id') id: number,
    @Body() caliber: CaliberDto,
  ): Promise<CaliberDto> {
    return await this.caliberService.edit(id, caliber);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Soft delete  d un  calibre',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.caliberService.delete(id);
  }
}
