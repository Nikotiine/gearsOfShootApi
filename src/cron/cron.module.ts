import { Module } from '@nestjs/common';
import { CartCronService } from './cart.cron/cart.cron.service';
import { InvoiceOrderModule } from '../invoice-order/invoice-order.module';

@Module({
  providers: [CartCronService],
  imports: [InvoiceOrderModule],
})
export class CronModule {}
