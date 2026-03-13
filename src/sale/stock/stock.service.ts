import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../../database/entity/stock.entity';
import { LessThan, Repository } from 'typeorm';
import { StockHistory } from '../../database/entity/stock-history.entity';
import {
  CreateStockDto,
  StockDto,
  StockHistoriesDto,
} from '../../dto/stock.dto';
import { CodeError } from '../../enum/code-error.enum';
import { StockableObject } from '../../enum/stock-item.enum';
import { UserService } from '../../user/user.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(StockHistory)
    private readonly stockHistoryRepository: Repository<StockHistory>,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(StockService.name);
  public async insert(
    dto: CreateStockDto,
    removeOlder?: boolean,
  ): Promise<StockDto> {
    let stock = await this.verifyIfExist(dto);
    if (!stock) {
      stock = this.stockRepository.create({
        object: dto.object,
        objectId: dto.objectId,
        quantity: 0,
      });
    }
    let previousQuantity = stock.quantity;
    if (removeOlder) {
      previousQuantity = await this.getPreviousQuantity(stock.id, dto.orderId);
    }

    let newQuantity: number = 0;
    if (dto.movementType === 'IN') {
      newQuantity = previousQuantity + dto.quantity;
    } else if (dto.movementType === 'OUT' || dto.movementType === 'CART_OUT') {
      this.handleQuantityError(
        previousQuantity,
        dto.quantity,
        dto.object,
        dto.objectId,
      );
      newQuantity = previousQuantity - dto.quantity;
    }
    stock.quantity = newQuantity;
    const stockSaved = await this.stockRepository.save(stock);
    await this.saveHistory(stockSaved, dto, previousQuantity, removeOlder);
    return this.mapEntityToDto(stockSaved);
  }

  private async verifyIfExist(dto: CreateStockDto): Promise<Stock | null> {
    return await this.stockRepository.findOne({
      where: {
        object: dto.object,
        objectId: dto.objectId,
      },
      relations: {
        histories: {
          createdBy: true,
          updatedBy: true,
        },
      },
    });
  }
  private handleQuantityError(
    quantityInStock: number,
    quantityToRemove: number,
    object: StockableObject,
    objectId: number,
  ): void {
    if (quantityInStock < quantityToRemove) {
      this.handleBadRequestException(object, objectId);
    }
  }

  private handleBadRequestException(object: StockableObject, objectId: number) {
    let message: string = CodeError.STOCK_QUANTITY_ERROR;
    switch (object) {
      case StockableObject.AMMUNITION:
        message = CodeError.AMMUNITION_OUT_OF_STOCK;
        break;
      case StockableObject.OPTIC:
        message = CodeError.OPTIC_NOT_FOUND;
        break;
      case StockableObject.HANDGUN:
        message = CodeError.HANDGUN_OUT_OF_STOCK;
        break;
      case StockableObject.RIFFLE:
        message = CodeError.RIFFLE_OUT_OF_STOCK;
        break;
      case StockableObject.MAGAZINE:
        message = CodeError.WEAPON_MAGAZINE_OUT_OF_STOCK;
        break;
      case StockableObject.OPTIC_COLLAR:
        message = CodeError.OPTIC_COLLAR_OUT_OF_STOCK;
        break;
      case StockableObject.RDS:
        message = CodeError.SOUND_NOISE_OUT_OF_STOCK;
        break;
    }
    const error = {
      message: message,
      object: object,
      id: objectId,
      error: 'Bad Request',
      statusCode: 400,
    };
    throw new BadRequestException(error);
  }

  private async saveHistory(
    stock: Stock,
    dto: CreateStockDto,
    previousQuantity: number,
    removeOlder?: boolean,
  ): Promise<StockHistory> {
    if (removeOlder) {
      const older = await this.stockHistoryRepository.findOne({
        where: {
          movement: 'CART_OUT',
          stock: {
            id: stock.id,
          },
          orderId: dto.orderId,
        },
      });
      if (older) {
        await this.stockHistoryRepository.delete(older.id);
      }
    }
    const entity = this.stockHistoryRepository.create({
      stock: stock,
      newQuantity: stock.quantity,
      previousQuantity: previousQuantity,
      movement: dto.movementType,
      movementQuantity: dto.quantity,
      reason: dto.reason,
      cartValidity: dto.cartValidity,
      orderId: dto.orderId,
    });
    return await this.stockHistoryRepository.save(entity);
  }

  public async getPreviousQuantity(
    stockId: number,
    orderId: number,
  ): Promise<number | null> {
    const older = await this.stockHistoryRepository.findOne({
      where: {
        stock: {
          id: stockId,
        },
        orderId: orderId,
      },
      order: {
        id: 'DESC',
      },
    });
    if (!older) {
      return null;
    }
    return older.previousQuantity;
  }

  public initStock(
    initialStock: number,
    object: StockableObject,
    objectId: number,
  ): Promise<StockDto> {
    const dto: CreateStockDto = {
      objectId: objectId,
      object: object,
      quantity: initialStock,
      movementType: 'IN',
      reason: 'Initialisation',
    };
    return this.insert(dto);
  }

  public async findLastByObjectId(
    objectId: number,
    object: StockableObject,
  ): Promise<StockDto> {
    const entity = await this.stockRepository.findOne({
      where: {
        object: object,
        objectId: objectId,
      },
      relations: {
        histories: {
          createdBy: true,
        },
      },
      order: {
        histories: {
          createdAt: 'DESC',
        },
      },
    });
    return this.mapEntityToDto(entity);
  }

  public async findCurrentQuantity(
    objectId: number,
    object: StockableObject,
  ): Promise<number> {
    const current = await this.findLastByObjectId(objectId, object);
    return current ? current.quantity : 0;
  }

  private mapEntityToDto(entity: Stock): StockDto {
    return {
      id: entity.id,
      quantity: entity.quantity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      objectId: entity.objectId,
      histories: entity.histories
        ? this.mapHistoryEntityArrayToArrayDto(entity.histories)
        : [],
    };
  }

  private mapHistoryEntityToDto(entity: StockHistory): StockHistoriesDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      movementQuantity: entity.movementQuantity,
      newQuantity: entity.newQuantity,
      previousQuantity: entity.previousQuantity,
      movement: entity.movement,
      reason: entity.reason,
      createdBy: this.userService.mapEntityToDto(entity.createdBy),
    };
  }

  private mapHistoryEntityArrayToArrayDto(
    entities: StockHistory[],
  ): StockHistoriesDto[] {
    return entities.map((history) => {
      return this.mapHistoryEntityToDto(history);
    });
  }

  public async removeAllInCart(): Promise<any> {
    const histories: StockHistory[] = await this.getInCartHistories();
    for (const history of histories) {
      const previousQuantity = await this.getPreviousQuantity(
        history.stock.id,
        history.orderId,
      );
      const stock = await this.stockRepository.findOne({
        where: {
          id: history.stock.id,
        },
      });
      if (!stock) {
        this.logger.log(`${history.stock.id} not found`);
      }
      stock.quantity = previousQuantity;
      await this.stockRepository.save(stock);
      await this.stockHistoryRepository.delete({
        movement: 'CART_OUT',
        cartValidity: LessThan(new Date()),
        stock: {
          id: stock.id,
        },
      });
    }
  }

  private async getInCartHistories(): Promise<StockHistory[]> {
    return this.stockHistoryRepository.find({
      where: {
        movement: 'CART_OUT',
        cartValidity: LessThan(new Date()),
      },
      relations: {
        stock: true,
      },
    });
  }
}
