import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticCollar } from '../../database/entity/optic-collar.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  CreateOpticCollarDto,
  OpticCollarDto,
  UpdateOpticCollarDto,
} from '../../dto/optic-collar.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';
import { PriceHistoryService } from '../../sale/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { StockableObject } from '../../enum/stock-item.enum';
import { StockDto } from '../../dto/stock.dto';
import { StockService } from '../../sale/stock/stock.service';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../../dto/item-invoice-supplier.dto';
import { OpticCollarFilter } from '../filters/optic-collar.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { opticCollarWhereFilterConfig } from '../filters/optic-collar-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { DiscountedItemDto, NewItemsDto } from '../../dto/new-items.dto';
import { UserService } from '../../user/user.service';
import { ItemsInStockResult } from '../../utils/interface/ItemsInStockResult.interface';

@Injectable()
export class OpticCollarService {
  constructor(
    @InjectRepository(OpticCollar)
    private readonly opticCollarRepository: Repository<OpticCollar>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  public async findAll(
    filters: OpticCollarFilter,
  ): Promise<PaginatedResponseDto<OpticCollarDto>> {
    const { limit, offset } = filters;
    const where: FindOptionsWhere<OpticCollar> = buildWhereGeneric<
      OpticCollarFilter,
      OpticCollar
    >(filters, opticCollarWhereFilterConfig);
    const [entities, total] = await this.opticCollarRepository.findAndCount({
      where,
      relations: {
        railSize: true,
        factory: true,
      },
      take: limit,
      skip: offset,
      order: {
        id: 'DESC',
      },
    });
    const data = await this.mapOpticCollarArrayToDtoArray(entities);
    return new PaginatedResponseDto<OpticCollarDto>(data, total, limit, offset);
  }

  public async insert(collar: CreateOpticCollarDto): Promise<OpticCollarDto> {
    const isExist = await this.verifyIsNoExist(collar);
    if (isExist) {
      throw new BadRequestException(CodeError.OPTIC_COLLAR_IS_EXIST);
    }
    const entity = this.opticCollarRepository.create({
      diameter: collar.diameter,
      name: collar.name,
      height: collar.height,
      factory: collar.factory,
      railSize: collar.railSize,
      reference: await this.createReference(collar),
      description: collar.description,
      isDiscounted: collar.priceHistory.isDiscounted,
    });

    const created = await this.opticCollarRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      collar.priceHistory,
      created.id,
      PriceableObjectType.OPTIC_COLLAR,
    );
    const stock: StockDto = await this.stockService.initStock(
      collar.inStock,
      StockableObject.OPTIC_COLLAR,
      created.id,
    );
    return this.mapEntityToDto(created, price, stock);
  }

  public async findById(id: number): Promise<OpticCollarDto> {
    const collar = await this.opticCollarRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: true,
        railSize: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!collar) {
      throw new NotFoundException(CodeError.OPTIC_COLLAR_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      collar.id,
      PriceableObjectType.OPTIC_COLLAR,
    );
    return this.mapEntityToDto(collar, price);
  }

  public async update(
    id: number,
    collar: UpdateOpticCollarDto,
  ): Promise<OpticCollarDto> {
    const updatedResult = await this.opticCollarRepository.preload({
      id,
      ...collar,
      factory: collar.factory,
      railSize: collar.railSize,
      isDiscounted: collar.priceHistory.isDiscounted,
    });
    const updated: OpticCollar =
      await this.opticCollarRepository.save(updatedResult);

    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        collar.priceHistory,
        id,
        PriceableObjectType.OPTIC_COLLAR,
      );
    return this.mapEntityToDto(updated, price);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticCollarRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.OPTIC_COLLAR,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.OPTIC_COLLAR_SOFT_DELETE,
    };
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const collar: OpticCollarDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      factory: collar.factory,
      name: collar.name,
      reference: collar.reference,
      description: `Pour rail: ${collar.railSize.name ?? ''} | Diametre: ${collar.diameter} | Description: ${collar.description}`,
    };
  }

  public async findLastEntry(): Promise<NewItemsDto | null> {
    const [entity] = await this.opticCollarRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        factory: true,
        railSize: true,
      },
      take: 1,
    });
    if (!entity) {
      return null;
    }
    const dto = await this.mapEntityToDto(entity);
    return {
      name: dto.name,
      type: 'optic',
      id: dto.id,
      price: dto.priceHistory.currentSalePrice,
      sub: `Corps d'optique:${dto.diameter}-Pour rail: ${dto.railSize.name}`,
      factory: dto.factory.name,
    };
  }
  public async isItemsAreInStock(
    id: number,
    quantity: number,
  ): Promise<ItemsInStockResult> {
    let isInStock = true;
    const item = await this.findById(id);
    if (!item) {
      isInStock = false;
    }
    const inStockQuantity = item.inStock;
    if (quantity > inStockQuantity) {
      isInStock = false;
    }
    return {
      isInStock,
      codeError: CodeError.OPTIC_COLLAR_OUT_OF_STOCK,
    };
  }

  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities: OpticCollar[] = await this.opticCollarRepository.find({
      where: {
        isDiscounted: true,
      },
      take: limit,
      relations: {
        factory: true,
      },
    });
    if (!entities) {
      return null;
    }
    const dtos = await this.mapOpticCollarArrayToDtoArray(entities);
    return dtos.map((dto: OpticCollarDto) => {
      return {
        name: dto.name,
        type: 'optic',
        id: dto.id,
        price: dto.priceHistory.currentSalePrice,
        sub: `Corps d'optique:${dto.diameter}-Pour rail: ${dto.railSize.name}`,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
      };
    });
  }

  private async verifyIsNoExist(dto: CreateOpticCollarDto): Promise<boolean> {
    const entity: OpticCollar = await this.opticCollarRepository.findOne({
      where: {
        name: dto.name,
        factory: {
          id: dto.factory.id,
        },
        height: dto.height,
        diameter: dto.diameter,
      },
    });
    return !!entity;
  }

  private async createReference(collar: CreateOpticCollarDto): Promise<string> {
    return `${collar.factory.reference.substring(0, 3)}-${collar.name}-${collar.diameter}-${collar.height}`;
  }

  private async mapEntityToDto(
    collar: OpticCollar,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<OpticCollarDto> {
    return {
      id: collar.id,
      diameter: collar.diameter,
      height: collar.height,
      railSize: collar.railSize,
      factory: collar.factory,
      description: collar.description,
      reference: collar.reference,
      name: collar.name,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            collar.id,
            PriceableObjectType.OPTIC_COLLAR,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            collar.id,
            StockableObject.OPTIC_COLLAR,
          ),
      stock: stock,
      createdBy: this.userService.mapEntityToDto(collar.createdBy),
      updatedBy: this.userService.mapEntityToDto(collar.updatedBy),
      createdAt: collar.createdAt,
      updatedAt: collar.updatedAt,
      isDiscounted: collar.isDiscounted,
    };
  }
  private async mapOpticCollarArrayToDtoArray(
    collars: OpticCollar[],
  ): Promise<OpticCollarDto[]> {
    const dtoPromises = collars.map(async (collar) =>
      this.mapEntityToDto(collar),
    );
    return await Promise.all(dtoPromises);
  }
}
