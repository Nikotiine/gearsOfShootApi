import { Injectable, Logger } from '@nestjs/common';
import { ClientOrderService } from '../../invoice-order/client-order/client-order.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CartCronService {
  private readonly logger = new Logger(CartCronService.name);
  constructor(private readonly clientOrderService: ClientOrderService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCleanExpiredCart(): Promise<void> {
    const deletedCount = await this.clientOrderService.deleteAllExpiredCart();

    if (deletedCount > 0) {
      this.logger.log(`${deletedCount} expired carts deleted`);
    }
  }
}
