import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientOrderItem } from '../../database/entity/client-order-item.entity';
import { CreateClientOrderItemDto } from '../../dto/client-order-item.dto';
import { ClientOrder } from '../../database/entity/client-order.entity';
import { CreateStockDto } from '../../dto/stock.dto';
import { StockService } from '../../sale/stock/stock.service';

@Injectable()
export class ClientOrderItemService {
  constructor(
    @InjectRepository(ClientOrderItem)
    private readonly clientOrderItemRepository: Repository<ClientOrderItem>,
    private readonly stockService: StockService,
  ) {}

  public async insert(
    item: CreateClientOrderItemDto,
    order: ClientOrder,
    vat: number,
    removeOlder?: boolean,
  ): Promise<ClientOrderItem> {
    const entity: ClientOrderItem = this.clientOrderItemRepository.create({
      object: item.object,
      objectId: item.objectId,
      status: item.status,
      comment: item.comment,
      category: item.category,
      quantity: item.quantity,
      factory: item.factory,
      name: item.name,
      totalPrice:
        item.price * item.quantity + item.price * item.quantity * (vat / 100),
      unitPriceHT: item.price,
      totalPriceHT: item.price * item.quantity,
      order: order,
      to: item.to,
    });
    //TODO : Trouver l utilisateur et l'jouter a a la raison
    const updateStockDto: CreateStockDto = {
      objectId: item.objectId,
      object: item.object,
      quantity: item.quantity,
      reason: 'Mis dans le panier',
      movementType: 'CART_OUT',
      cartValidity: order.cartValidity,
    };
    await this.stockService.insert(updateStockDto, removeOlder);
    return await this.clientOrderItemRepository.save(entity);
  }

  public async deleteByOrder(orderId: number): Promise<any> {
    await this.clientOrderItemRepository.delete({
      order: {
        id: orderId,
      },
    });
  }

  public mapEntityToDto(entity: ClientOrderItem): CreateClientOrderItemDto {
    return {
      ...entity,
      price: entity.unitPriceHT,
    };
  }

  public mapArrayEntityToArrayDto(
    entities: ClientOrderItem[],
  ): CreateClientOrderItemDto[] {
    return entities.map((entity: ClientOrderItem) =>
      this.mapEntityToDto(entity),
    );
  }
}
