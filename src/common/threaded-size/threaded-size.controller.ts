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
import { ThreadedSizeService } from './threaded-size.service';
import {
  CreateThreadedSizeDto,
  ThreadedSizeDto,
} from '../../dto/threaded-size.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';

@Controller('threaded-size')
@ApiTags('Threaded-size')
export class ThreadedSizeController {
  constructor(private readonly threadedSieService: ThreadedSizeService) {}

  @Get('')
  @ApiOkResponse({
    type: [ThreadedSizeDto],
  })
  @ApiOperation({
    summary: 'Listes des filletages',
    description: 'Retourne la liste des filletage disponible',
  })
  public async findAllThreadedSize(): Promise<ThreadedSizeDto[]> {
    return await this.threadedSieService.findAll();
  }

  @Post('')
  @ApiOperation({
    summary: 'Ajout d un filetage',
    description: 'Ajouter un nouveux type de filetage arme ou rds ',
  })
  @ApiCreatedResponse({
    type: ThreadedSizeDto,
  })
  @ApiBody({
    type: CreateThreadedSizeDto,
  })
  public async create(
    @Body() threadedSize: CreateThreadedSizeDto,
  ): Promise<ThreadedSizeDto> {
    return await this.threadedSieService.insert(threadedSize);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiCreatedResponse({
    type: ThreadedSizeDto,
  })
  @ApiOperation({
    summary: 'Edition',
    description: 'Edition d une taille de filletage',
  })
  @ApiBody({
    type: ThreadedSizeDto,
  })
  public async edit(
    @Param('id') id: number,
    size: ThreadedSizeDto,
  ): Promise<ThreadedSizeDto> {
    return await this.threadedSieService.edit(id, size);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    summary: 'Suppression logique',
    description: 'Soft delete  d un  filletage',
  })
  @ApiOkResponse({
    type: ApiDeleteResponseDto,
  })
  public async delete(@Param('id') id: number): Promise<ApiDeleteResponseDto> {
    return await this.threadedSieService.delete(id);
  }
}
