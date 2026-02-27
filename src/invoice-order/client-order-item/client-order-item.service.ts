import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientOrderItem } from '../../database/entity/client-order-item.entity';
import {
  ClientOrderItemDto,
  CreateClientOrderItemDto,
} from '../../dto/client-order-item.dto';
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
    const updateStockDto: CreateStockDto = {
      objectId: item.objectId,
      object: item.object,
      quantity: item.quantity,
      reason: 'Mis dans le panier',
      movementType: 'CART_OUT',
    };
    await this.stockService.insert(updateStockDto);
    return await this.clientOrderItemRepository.save(entity);
  }

  public mapEntityToDto(entity: ClientOrderItem): ClientOrderItemDto {
    return {
      ...entity,
      price: entity.unitPriceHT,
    };
  }

  public mapArrayEntityToArrayDto(
    entities: ClientOrderItem[],
  ): ClientOrderItemDto[] {
    return entities.map((entity: ClientOrderItem) =>
      this.mapEntityToDto(entity),
    );
  }
}
