import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { ClientOrder } from '../../database/entity/client-order.entity';
import {
  ClientOrderDto,
  CreateClientOrderDto,
  UpdateClientOrderDto,
} from '../../dto/client-order.dto';
import { CreateClientOrderItemDto } from '../../dto/client-order-item.dto';
import { UserService } from '../../user/user.service';
import { QueryUser } from '../../decorator/req-query-user.decorator';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { ClientOrderFilter } from './filters/client-order.filter';
import { clientOrderWhereFilterConfig } from './filters/client-order-where-filter.config';
import { ClientOrderItemService } from '../client-order-item/client-order-item.service';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';
import { StockableObject } from '../../enum/stock-item.enum';
import { AmmunitionService } from '../../ammunition/ammunition.service';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class ClientOrderService {
  constructor(
    @InjectRepository(ClientOrder)
    private readonly clientOrderEntityRepository: Repository<ClientOrder>,
    private readonly userService: UserService,
    private readonly clientOrderItemService: ClientOrderItemService,
    private readonly ammunitionService: AmmunitionService,
  ) {}

  public async insert(
    order: CreateClientOrderDto,
    queryUser: QueryUser,
  ): Promise<ClientOrderDto> {
    const user = await this.userService.findById(queryUser.id);
    const verifyIfUserHaveCart = user.inCartId !== null;
    if (verifyIfUserHaveCart) {
      return this.update(user.inCartId, {
        ...order,
        id: user.inCartId,
      });
    }
    const stockIsOk = await this.verifyIfStockIsOk(order.items);
    if (!stockIsOk) {
      //TODO : Gerer le retrour utilisateur pour savoir quel produit est hors stock
      throw new BadRequestException(CodeError.ORDER_OUT_OF_STOCK);
    }
    //TODO: Enelver les objet du stock le temps que le panier est valide
    const entity: ClientOrder = this.clientOrderEntityRepository.create({
      vat: order.vat,
      invoiceStatus: order.status,
      shippingCost: order.shippingCost,
      totalPriceHt: this.getTotalPriceHt(order.items),
      totalPriceTTC: this.getTotalPriceTTC(order.items, order.vat),
      orderedBy: user,
      shippingAddress: order.shippingAddress,
      paymentAddress: order.paymentAddress,
      totalItems: this.getTotalItems(order.items),
      message: order.message,
      cartValidity: this.getCartValidityTime(order.status),
      items: [],
    });
    const created = await this.clientOrderEntityRepository.save(entity);
    for (const item of order.items) {
      created.items.push(
        await this.clientOrderItemService.insert(item, created, created.vat),
      );
    }
    return this.mapEntityToDto(created);
  }

  public async update(id: number, order: UpdateClientOrderDto): Promise<any> {
    // TODO: ajouter verifiaction user connecter === client de la commande + access admin
    const stockIsOk = await this.verifyIfStockIsOk(order.items);
    if (!stockIsOk) {
      //TODO : Gerer le retrour utilisateur pour savoir quel produit est hors stock
      throw new BadRequestException(CodeError.ORDER_OUT_OF_STOCK);
    }
    const updatedResult = await this.clientOrderEntityRepository.preload({
      id,
      ...order,
    });
    const updated: ClientOrder =
      await this.clientOrderEntityRepository.save(updatedResult);
    return this.mapEntityToDto(updated);
  }

  public async findById(id: number): Promise<ClientOrderDto> {
    const order: ClientOrder = await this.clientOrderEntityRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        shippingAddress: true,
        items: true,
        paymentAddress: true,
      },
    });
    return this.mapEntityToDto(order);
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
          shippingAddress: true,
          items: true,
          paymentAddress: true,
        },
        take: limit,
        skip: offset,
        order: { id: 'DESC' },
      });
    const data: ClientOrderDto[] = this.mapArrayEntityToArrayDto(entities);
    return new PaginatedResponseDto<ClientOrderDto>(data, total, limit, offset);
  }

  public async deleteAllExpiredCart(): Promise<number> {
    const result = await this.clientOrderEntityRepository.delete({
      invoiceStatus: 'IN_CART',
      cartValidity: LessThan(new Date()),
    });

    return result.affected ?? 0;
  }

  /**
   * Compte le prix total de la facture HT
   * @param items
   * @private
   */
  private getTotalPriceHt(items: CreateClientOrderItemDto[]): number {
    let total: number = 0;
    for (const item of items) {
      total += item.quantity * item.price;
    }
    return total;
  }

  /**
   * Compte le nombre total d'objet commandés
   * @param items
   * @private
   */
  private getTotalItems(items: CreateClientOrderItemDto[]): number {
    let total: number = 0;
    for (const item of items) {
      total += item.quantity;
    }
    return total;
  }
  private getCartValidityTime(status: InvoiceOrderStatus): Date | null {
    if (status !== 'IN_CART') return null;
    const now = new Date();
    return this.addMinutes(now, 15);
  }

  private addMinutes(date: Date, minutes: number): Date {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  private async verifyIfStockIsOk(
    items: CreateClientOrderItemDto[],
  ): Promise<boolean> {
    for (const item of items) {
      switch (item.object.toUpperCase()) {
        case StockableObject.AMMUNITION:
          return await this.ammunitionService.isItemsAreInStock(
            item.objectId,
            item.quantity,
          );
      }
    }
  }

  private mapEntityToDto(entity: ClientOrder): ClientOrderDto {
    return {
      ...entity,
      status: entity.invoiceStatus,
      items: this.clientOrderItemService.mapArrayEntityToArrayDto(entity.items),
    };
  }

  private mapArrayEntityToArrayDto(order: ClientOrder[]): ClientOrderDto[] {
    return order.map((order) => this.mapEntityToDto(order));
  }

  private getTotalPriceTTC(items: CreateClientOrderItemDto[], vat: number) {
    const priceHT = this.getTotalPriceHt(items);
    return priceHT + (priceHT * vat) / 100;
  }
}
