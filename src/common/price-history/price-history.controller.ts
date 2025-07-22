import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PriceHistoryService } from './price-history.service';

@Controller('price-history')
@ApiTags('Price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}
}
