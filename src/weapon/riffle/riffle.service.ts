import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Riffle } from '../../database/entity/riffle.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import {
  CreateRiffleDto,
  RiffleDto,
  UpdateRiffleDto,
} from '../../dto/riffle.dto';

import { CodeError } from '../../enum/code-error.enum';

import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { PriceHistoryService } from '../../sale/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { StockDto } from '../../dto/stock.dto';
import { StockableObject } from '../../enum/stock-item.enum';
import { StockService } from '../../sale/stock/stock.service';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../../dto/item-invoice-supplier.dto';
import { RiffleFilter } from '../filters/riffle.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { riffleWhereFilterConfig } from '../filters/riffle-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { LegislationCategory } from '../../types/legislation-category.type';
import { DiscountedItemDto, NewItemsDto } from '../../dto/new-items.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class RiffleService {
  constructor(
    @InjectRepository(Riffle)
    private readonly riffleRepository: Repository<Riffle>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  /**
   * Crée et persiste une nouvelle arme de type carabine (riffle).
   *
   * Cette méthode :
   * - Vérifie qu'une arme identique n'existe pas déjà
   * - Crée l'entité `Riffle` à partir des données fournies
   * - Génère une référence unique pour la carabine
   * - Initialise l'historique de prix associé
   * - Initialise le stock de la carabine
   * - Retourne la carabine créée sous forme de `RiffleDto`
   *
   * @param riffle - Données nécessaires à la création de la carabine
   *
   * @throws {BadRequestException}
   * Lancée si une carabine identique existe déjà
   * (`CodeError.WEAPON_IS_EXIST`)
   *
   * @returns {Promise<RiffleDto>}
   * La carabine créée, incluant :
   * - ses caractéristiques techniques
   * - son prix courant
   * - son stock initial
   *
   * @remarks
   * - L'historique de prix est géré via `PriceHistoryService`
   * - Le stock est initialisé via `StockService`
   * - La référence est générée automatiquement à la création
   *
   * @example
   * ```ts
   * const riffle = await riffleService.insert(createRiffleDto);
   * ```
   */
  public async insert(riffle: CreateRiffleDto): Promise<RiffleDto> {
    const isExist = await this.verifyIfIsExist(riffle);
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }
    const entity = this.riffleRepository.create({
      name: riffle.name,
      variation: riffle.variation,
      factory: riffle.factory,
      isThreadedBarrel: riffle.isThreadedBarrel,
      isAdjustableTrigger: riffle.isAdjustableTrigger,
      caliber: riffle.caliber,
      type: riffle.type,
      description: riffle.description,
      barrelLength: riffle.barrelLength,
      barrelType: riffle.barrelType,
      category: riffle.category,
      threadedSize: riffle.threadedSize,
      adjustableTriggerMaxWeight: riffle.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: riffle.adjustableTriggerMinWeight,
      reference: this.createReference(riffle),
      percussionType: riffle.percussionType,
      providedMagazineQuantity: riffle.providedMagazineQuantity,
      barrelSize: riffle.barrelSize,
      isAdjustableButt: riffle.isAdjustableButt,
      isAdjustableBusk: riffle.isAdjustableBusk,
      buttMaterial: riffle.buttMaterial,
      railSize: riffle.railSize,
      grenadierSlot: riffle.grenadierSlot,
      qcSlot: riffle.qcSlot,
      isMlockCompatibility: riffle.isMlockCompatibility,
      isOpenAim: riffle.isOpenAim,
      isAdjustableFrontSight: riffle.isAdjustableFrontSight,
      isAdjustableBackSight: riffle.isAdjustableBackSight,
      mLockOptions: riffle.mLockOptions,
      barrelColor: riffle.barrelColor,
      buttColor: riffle.buttColor,
      isDiscounted: riffle.priceHistory.isDiscounted,
    });
    const created = await this.riffleRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      riffle.priceHistory,
      created.id,
      PriceableObjectType.RIFFLE,
    );
    const stock: StockDto = await this.stockService.initStock(
      riffle.inStock,
      StockableObject.RIFFLE,
      created.id,
    );
    return this.mapEntityToDto(created, price, stock);
  }

  public async update(id: number, riffle: UpdateRiffleDto): Promise<RiffleDto> {
    const entity = await this.riffleRepository.preload({
      id: id,
      ...riffle,
      factory: riffle.factory,
      caliber: riffle.caliber,
      barrelColor: riffle.barrelColor,
      buttColor: riffle.buttColor,
      buttMaterial: riffle.buttMaterial,
      railSize: riffle.railSize,
      percussionType: riffle.percussionType,
      barrelType: riffle.barrelType,
      threadedSize: riffle.threadedSize,
      reference: this.createReference(riffle),
      isDiscounted: riffle.priceHistory.isDiscounted,
    });

    const updated = await this.riffleRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      riffle.priceHistory,
      updated.id,
      PriceableObjectType.RIFFLE,
    );
    return this.mapEntityToDto(updated, price);
  }

  /**
   * Récupère une liste paginée de carabines (riffles) selon des filtres dynamiques.
   *
   * Cette méthode :
   * - Applique des filtres métier via `buildWhereGeneric`
   * - Gère la pagination (limit / offset)
   * - Charge les relations nécessaires à l'affichage détaillé
   * - Retourne les résultats sous forme paginée de `RiffleDto`
   *
   * @param filters - Filtres de recherche et paramètres de pagination
   *
   * @returns {Promise<PaginatedResponseDto<RiffleDto>>}
   * Une réponse paginée contenant :
   * - la liste des carabines correspondantes
   * - le nombre total d'éléments
   * - la limite et l'offset utilisés
   *
   * @remarks
   * - La pagination utilise des valeurs par défaut (`limit = 10`, `offset = 0`)
   * - Les filtres sont construits dynamiquement via `riffleWhereFilterConfig`
   * - Les relations sont chargées afin d'éviter des requêtes supplémentaires (N+1)
   *
   * @example
   * ```ts
   * const result = await riffleService.findAll({
   *   limit: 20,
   *   offset: 0,
   *   caliber: 308,
   * });
   * ```
   */
  public async findAll(
    filters: RiffleFilter,
  ): Promise<PaginatedResponseDto<RiffleDto>> {
    const { limit = 10, offset = 0 } = filters;
    const where: FindOptionsWhere<Riffle> = buildWhereGeneric<
      RiffleFilter,
      Riffle
    >(filters, riffleWhereFilterConfig);
    const [entities, total] = await this.riffleRepository.findAndCount({
      where,
      relations: {
        factory: true,
        buttMaterial: true,
        buttColor: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
        railSize: true,
        createdBy: true,
        updatedBy: true,
      },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
    const data: RiffleDto[] = await this.mapEntityArrayToDtoArray(entities);
    return new PaginatedResponseDto<RiffleDto>(data, total, limit, offset);
  }

  public async findById(id: number): Promise<RiffleDto> {
    const riffle = await this.riffleRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: true,
        buttMaterial: true,
        buttColor: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: {
          mode: true,
        },
        barrelType: true,
        railSize: true,
        mLockOptions: true,
        barrelColor: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!riffle) {
      throw new NotFoundException(CodeError.WEAPON_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      riffle.id,
      PriceableObjectType.RIFFLE,
    );
    const stock = await this.stockService.findLastByObjectId(
      riffle.id,
      StockableObject.RIFFLE,
    );
    return this.mapEntityToDto(riffle, price, stock);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.riffleRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.RIFFLE,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const riffle: RiffleDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      caliber: riffle.caliber,
      category: riffle.category,
      factory: riffle.factory,
      name: riffle.name,
      reference: riffle.reference,
      colors: `Crosse: ${riffle.buttColor?.name}| Cannon: ${riffle.barrelColor?.name}`,
      description: `Variante: ${riffle.variation ?? ''} | Type percussion: ${riffle.percussionType.name} | Type: ${riffle.type.name} | Description: ${riffle.description}`,
    };
  }

  public async mapEntityArrayToDtoArray(
    riffles: Riffle[],
  ): Promise<RiffleDto[]> {
    const dtoPromises = riffles.map(async (riffle) => {
      return this.mapEntityToDto(riffle);
    });
    return await Promise.all(dtoPromises);
  }

  public async findLastEntry(
    category: LegislationCategory,
  ): Promise<NewItemsDto | null> {
    const [entity] = await this.riffleRepository.find({
      where: {
        category: {
          name: category,
        },
      },
      order: { createdAt: 'DESC' },
      take: 1,
      relations: {
        caliber: true,
        category: true,
        factory: true,
      },
    });
    if (!entity) {
      return null;
    }
    const dto = await this.mapEntityToDto(entity);

    return {
      name: dto.name,
      type: 'riffle',
      price: dto.priceHistory.currentSalePrice,
      id: dto.id,
      factory: dto.factory.name,
      sub: `Calibre: ${dto.caliber.name}, Categorie: ${dto.category.name}`,
      category: dto.category,
    };
  }

  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities: Riffle[] = await this.riffleRepository.find({
      where: {
        isDiscounted: true,
        category: {
          name: In(['B', 'C']),
        },
      },
      relations: {
        caliber: true,
        category: true,
        factory: true,
      },
      take: limit,
    });
    if (!entities) {
      return null;
    }
    const dtos = await this.mapEntityArrayToDtoArray(entities);
    return dtos.map((dto: RiffleDto) => {
      return {
        name: dto.name,
        type: 'riffle',
        price: dto.priceHistory.currentSalePrice,
        id: dto.id,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
        sub: `Calibre: ${dto.caliber.name}`,
        category: dto.category,
      };
    });
  }

  public async isItemsAreInStock(
    id: number,
    quantity: number,
  ): Promise<boolean> {
    let isInStock = true;
    const item = await this.findById(id);
    if (!item) {
      //throw new BadRequestException(CodeError.AMMUNITION_ARE_NOT_IN_STOCK);
      isInStock = false;
    }
    const inStockQuantity = item.inStock;
    if (quantity > inStockQuantity) {
      isInStock = false;
    }
    return isInStock;
  }

  //******************************************** PRIVATE***************************************************************
  private createReference(dto: CreateRiffleDto): string {
    return `${dto.factory.reference.substring(0, 4)}-${dto.name}-${dto.caliber.reference}`;
  }

  /**
   * Verifie si l'arme est pas deja presente en base
   * @private
   * @param newEntity {CreateRiffleDto}
   */
  private async verifyIfIsExist(newEntity: CreateRiffleDto): Promise<boolean> {
    const handGun = await this.riffleRepository.findOne({
      where: {
        name: newEntity.name,
        variation: newEntity.variation,
        caliber: newEntity.caliber,
        factory: newEntity.factory,
      },
    });
    return !!handGun;
  }

  private async mapEntityToDto(
    riffle: Riffle,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<RiffleDto> {
    return {
      id: riffle.id,
      barrelLength: riffle.barrelLength,
      name: riffle.name,
      description: riffle.description,
      type: riffle.type,
      threadedSize: riffle.threadedSize,
      reference: riffle.reference,
      adjustableTriggerMaxWeight: riffle.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: riffle.adjustableTriggerMinWeight,
      barrelType: riffle.barrelType,
      isAdjustableTrigger: riffle.isAdjustableTrigger,
      caliber: riffle.caliber,
      category: riffle.category,
      factory: riffle.factory,
      variation: riffle.variation,
      isThreadedBarrel: riffle.isThreadedBarrel,
      percussionType: riffle.percussionType,
      providedMagazineQuantity: riffle.providedMagazineQuantity,
      barrelSize: riffle.barrelSize,
      isAdjustableButt: riffle.isAdjustableButt,
      isAdjustableBusk: riffle.isAdjustableBusk,
      buttMaterial: riffle.buttMaterial,
      railSize: riffle.railSize,
      grenadierSlot: riffle.grenadierSlot,
      qcSlot: riffle.qcSlot,
      isMlockCompatibility: riffle.isMlockCompatibility,
      isOpenAim: riffle.isOpenAim,
      isAdjustableFrontSight: riffle.isAdjustableFrontSight,
      isAdjustableBackSight: riffle.isAdjustableBackSight,
      mLockOptions: riffle.mLockOptions
        ? riffle.mLockOptions.map((option) => {
            return {
              id: option.id,
              name: option.name,
            };
          })
        : [],
      buttColor: riffle.buttColor,
      barrelColor: riffle.barrelColor,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            riffle.id,
            PriceableObjectType.RIFFLE,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            riffle.id,
            StockableObject.RIFFLE,
          ),
      stock: stock,
      createdBy: this.userService.mapEntityToDto(riffle.createdBy),
      updatedBy: this.userService.mapEntityToDto(riffle.updatedBy),
      createdAt: riffle.createdAt,
      updatedAt: riffle.updatedAt,
      isDiscounted: riffle.isDiscounted,
    };
  }
}
