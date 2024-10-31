import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ThreadedSizeService } from './threaded-size.service';
import {
  CreateThreadedSizeDto,
  ThreadedSizeDto,
} from '../../dto/threaded-size.dto';

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
}
