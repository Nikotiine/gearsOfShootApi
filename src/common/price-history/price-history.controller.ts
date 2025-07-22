import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PriceHistoryService } from './price-history.service';
import { SwaggerDescription } from '../../enum/swagger-description.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';

@Controller('price-history')
@ApiTags('Price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Get(':type/:objectId')
  @ApiOkResponse({
    type: [PriceHistoryDto],
  })
  @ApiParam({
    name: SwaggerDescription.FIND_BY_TYPE_PARAM,
  })
  @ApiParam({
    name: 'objectId',
  })
  @ApiOperation({
    summary: SwaggerDescription.FIND_ALL_SUMMARY,
    description: 'Retourne la liste des historiques de prix disponible',
  })
  public async findByTypeAndObject(
    @Param('type') type: PriceableObjectType,
    @Param('objectId') objectId: number,
  ): Promise<PriceHistoryDto[]> {
    return this.priceHistoryService.findAllByObjectId(objectId, type);
  }
}
