import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientOrderEntity } from '../../database/entity/client-order.entity';
import { CreateClientOrderDTO } from '../../dto/client-order.dto';
import { CreateClientOrderItem } from '../../dto/client-order-item.dto';

@Injectable()
export class ClientOrderService {
  constructor(
    @InjectRepository(ClientOrderEntity)
    private readonly clientOrderEntityRepository: Repository<ClientOrderEntity>,
  ) {}

  public async insert(order: CreateClientOrderDTO): Promise<any> {
    const entity = this.clientOrderEntityRepository.create({
      vat: order.vat,
      invoiceStatus: 'IN_ORDER',
      shippingCost: order.shippingCost,
      totalPriceHt: this.getTotalPriceHt(order.items),
    });
    const created = await this.clientOrderEntityRepository.save(entity);
    return created;
  }

  /**
   * Compte le prix total de la facture HT
   * @param items
   * @private
   */
  private getTotalPriceHt(items: CreateClientOrderItem[]): number {
    let total: number = 0;
    for (const item of items) {
      total += item.quantity * item.price;
    }
    return total;
  }
}
