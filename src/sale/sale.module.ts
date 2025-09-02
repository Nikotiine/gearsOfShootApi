import { Module } from '@nestjs/common';
import { StockService } from './stock/stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '../database/entity/stock.entity';
import { StockHistory } from '../database/entity/stock-history.entity';
import { StockController } from './stock/stock.controller';

@Module({
  providers: [StockService],
  imports: [TypeOrmModule.forFeature([Stock, StockHistory])],
  exports: [StockService],
  controllers: [StockController],
})
export class SaleModule {}
