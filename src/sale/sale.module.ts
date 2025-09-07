import { Module } from '@nestjs/common';
import { StockService } from './stock/stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '../database/entity/stock.entity';
import { StockHistory } from '../database/entity/stock-history.entity';
import { StockController } from './stock/stock.controller';
import { PriceHistory } from '../database/entity/price-history.entity';
import { PriceHistoryService } from './price-history/price-history.service';
import { PriceHistoryController } from './price-history/price-history.controller';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierService } from './supplier/supplier.service';
import { Supplier } from '../database/entity/supplier.entity';
import { InvoiceSupplier } from '../database/entity/invoice-supplier.entity';
import { ItemInvoiceSupplier } from '../database/entity/item-invoice-supplier.entity';

@Module({
  providers: [StockService, PriceHistoryService, SupplierService],
  imports: [
    TypeOrmModule.forFeature([
      Stock,
      StockHistory,
      PriceHistory,
      Supplier,
      InvoiceSupplier,
      ItemInvoiceSupplier,
    ]),
  ],
  exports: [StockService, PriceHistoryService],
  controllers: [StockController, PriceHistoryController, SupplierController],
})
export class SaleModule {}
