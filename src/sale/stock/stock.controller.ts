import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto, StockDto } from '../../dto/stock.dto';
import { SwaggerDescription } from '../../enum/swagger-description.enum';

@Controller('stock')
@ApiTags('Stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @ApiBody({
    type: CreateStockDto,
  })
  @ApiCreatedResponse({
    type: StockDto,
  })
  @ApiOperation({
    summary: SwaggerDescription.CREATE_SUMMARY,
    description: 'Mise a jour du stock',
  })
  public async updateStock(@Body() stock: CreateStockDto): Promise<StockDto> {
    return this.stockService.insert(stock);
  }
}
