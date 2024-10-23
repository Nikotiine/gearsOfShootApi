import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThreadedSizeService } from './threaded-size.service';
import { ThreadedSizeDto } from '../../dto/threaded-size.dto';

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
}
