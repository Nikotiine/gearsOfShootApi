import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClientOrder } from '../../database/entity/client-order.entity';
import {
  ClientOrderDto,
  CreateClientOrderDto,
} from '../../dto/client-order.dto';
import { CreateClientOrderItem } from '../../dto/client-order-item.dto';
import { UserService } from '../../user/user.service';
import { QueryUser } from '../../decorator/req-query-user.decorator';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { ClientOrderFilter } from './filters/client-order.filter';
import { clientOrderWhereFilterConfig } from './filters/client-order-where-filter.config';

@Injectable()
export class ClientOrderService {
  constructor(
    @InjectRepository(ClientOrder)
    private readonly clientOrderEntityRepository: Repository<ClientOrder>,
    private readonly userService: UserService,
  ) {}

  public async insert(
    order: CreateClientOrderDto,
    queryUser: QueryUser,
  ): Promise<any> {
    const user = await this.userService.findById(queryUser.id);
    const entity = this.clientOrderEntityRepository.create({
      vat: order.vat,
      invoiceStatus: 'IN_ORDER',
      shippingCost: order.shippingCost,
      totalPriceHt: this.getTotalPriceHt(order.items),
      client: user,
    });
    const created = await this.clientOrderEntityRepository.save(entity);
    //TODO faire le mapper
    return created;
  }

  public async update(id: number, order: ClientOrderDto): Promise<any> {
    // TODO: ajouter verifiaction user connecter === client de la commande + access admin
    const updatedResult = await this.clientOrderEntityRepository.preload({
      id,
      ...order,
    });
    const updated: ClientOrder =
      await this.clientOrderEntityRepository.save(updatedResult);
    return updated;
  }

  public async findById(id: number): Promise<any> {
    const order: ClientOrder = await this.clientOrderEntityRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        shippingAddress: true,
      },
    });
    return order;
  }

  public async findAll(
    filter: ClientOrderFilter,
  ): Promise<PaginatedResponseDto<ClientOrderDto>> {
    const { limit = 10, offset = 0 } = filter;
    const where: FindOptionsWhere<ClientOrder> = buildWhereGeneric<
      ClientOrderFilter,
      ClientOrder
    >(filter, clientOrderWhereFilterConfig);
    const [entities, total] =
      await this.clientOrderEntityRepository.findAndCount({
        where,
        relations: {
          client: true,
          shippingAddress: true,
        },
        take: limit,
        skip: offset,
        order: { id: 'DESC' },
      });
    // TODO: Mapper a faire
    const data: any = entities;
    return new PaginatedResponseDto<ClientOrderDto>(data, total, limit, offset);
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
