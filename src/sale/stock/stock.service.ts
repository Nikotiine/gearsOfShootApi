import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../../database/entity/stock.entity';
import { Repository } from 'typeorm';
import { StockHistory } from '../../database/entity/stock-history.entity';
import {
  CreateStockDto,
  StockDto,
  StockHistoriesDto,
} from '../../dto/stock.dto';
import { CodeError } from '../../enum/code-error.enum';
import { StockableObject } from '../../enum/stock-item.enum';
@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(StockHistory)
    private readonly stockHistoryRepository: Repository<StockHistory>,
  ) {}

  public async insert(dto: CreateStockDto): Promise<Stock> {
    let stock = await this.verifyIfExist(dto);
    if (!stock) {
      stock = this.stockRepository.create({
        object: dto.object,
        objectId: dto.objectId,
        quantity: 0,
      });
    }
    const previousQuantity = stock.quantity;
    let newQuantity: number = 0;
    if (dto.movementType === 'IN') {
      newQuantity = previousQuantity + dto.quantity;
    } else if (dto.movementType === 'OUT') {
      this.handleQuantityError(previousQuantity, dto.quantity);
      newQuantity = previousQuantity - dto.quantity;
    }
    stock.quantity = newQuantity;
    const stockSaved = await this.stockRepository.save(stock);
    await this.saveHistory(stockSaved, dto, previousQuantity);
    return stockSaved;
  }

  private async verifyIfExist(dto: CreateStockDto): Promise<Stock | null> {
    return await this.stockRepository.findOne({
      where: {
        object: dto.object,
        objectId: dto.objectId,
      },
      relations: {
        histories: true,
      },
    });
  }
  private handleQuantityError(
    quantityInStock: number,
    quantityToRemove: number,
  ): void {
    if (quantityInStock < quantityToRemove) {
      throw new BadRequestException(CodeError.STOCK_QUANTITY_ERROR);
    }
  }

  private async saveHistory(
    stock: Stock,
    dto: CreateStockDto,
    previousQuantity: number,
  ): Promise<StockHistory> {
    const entity = this.stockHistoryRepository.create({
      stock: stock,
      newQuantity: stock.quantity,
      previousQuantity: previousQuantity,
      movement: dto.movementType,
      movementQuantity: dto.quantity,
      reason: dto.reason,
    });
    return await this.stockHistoryRepository.save(entity);
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
        histories: true,
      },
      order: { createdAt: 'DESC' },
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
      histories: this.mapHistoryEntityArrayToArrayDto(entity.histories),
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
    };
  }

  private mapHistoryEntityArrayToArrayDto(
    entities: StockHistory[],
  ): StockHistoriesDto[] {
    return entities.map((history) => {
      return this.mapHistoryEntityToDto(history);
    });
  }
}
