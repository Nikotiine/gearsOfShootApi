import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientOrderItem } from '../../database/entity/client-order-item.entity';
import {
  ClientOrderItemDto,
  CreateClientOrderItemDto,
} from '../../dto/client-order-item.dto';
import { ClientOrder } from '../../database/entity/client-order.entity';

@Injectable()
export class ClientOrderItemService {
  constructor(
    @InjectRepository(ClientOrderItem)
    private readonly clientOrderItemRepository: Repository<ClientOrderItem>,
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
