import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { SwaggerDescription } from '../enum/swagger-description.enum';
import { StoreDto } from '../dto/store.dto';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(SwaggerDescription.FIND_ALL)
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste complete des plans focal',
  })
  @ApiOkResponse({
    type: [StoreDto],
  })
  public async findAll(): Promise<StoreDto[]> {
    return await this.storeService.findAll();
  }
}
