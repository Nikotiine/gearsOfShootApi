import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandGun } from '../../database/entity/hand-gun.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import {
  CreateHandGunDto,
  HandGunDto,
  UpdateHandGunDto,
} from '../../dto/hand-gun.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { PriceHistoryService } from '../../sale/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { StockService } from '../../sale/stock/stock.service';
import { StockDto } from '../../dto/stock.dto';
import { StockableObject } from '../../enum/stock-item.enum';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../../dto/item-invoice-supplier.dto';
import { HandGunFilter } from '../filters/hand-gun.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { handGunWhereFilterConfig } from '../filters/hand-gun-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { DiscountedItemDto, NewItemsDto } from '../../dto/new-items.dto';
import { HandGunType } from '../../enum/weapon-type.enum';

@Injectable()
export class HandGunService {
  constructor(
    @InjectRepository(HandGun)
    private readonly handGunRepository: Repository<HandGun>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

  public async insert(handgun: CreateHandGunDto): Promise<HandGunDto> {
    const isExist = await this.verifyIfIsExist(handgun);
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }
    const entity = this.handGunRepository.create({
      name: handgun.name,
      description: handgun.description,
      variation: handgun.variation,
      reference: this.createReference(handgun),
      factory: handgun.factory,
      isThreadedBarrel: handgun.isThreadedBarrel,
      isAdjustableTrigger: handgun.isAdjustableTrigger,
      isOpticReady: handgun.isOpticReady,
      caliber: handgun.caliber,
      type: handgun.type,
      barrelLength: handgun.barrelLength,
      barrelType: handgun.barrelType,
      barrelColor: handgun.barrelColor,
      category: handgun.category,
      threadedSize: handgun.threadedSize,
      adjustableTriggerMaxWeight: handgun.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: handgun.adjustableTriggerMinWeight,
      providedMagazineQuantity: handgun.providedMagazineQuantity,
      percussionType: handgun.percussionType,
      barrelSize: handgun.barrelSize,
      slideMaterial: handgun.slideMaterial,
      slideColor: handgun.slideColor,
      buttMaterial: handgun.buttMaterial,
      buttColor: handgun.buttColor,
      isAdjustableFrontSight: handgun.isAdjustableFrontSight,
      isAdjustableBackSight: handgun.isAdjustableBackSight,
      triggerType: handgun.triggerType,
      decocking: handgun.decocking,
      isExternalHammer: handgun.isExternalHammer,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
      isDiscounted: handgun.priceHistory.isDiscounted,
    });
    const created = await this.handGunRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      handgun.priceHistory,
      created.id,
      PriceableObjectType.HANDGUN,
    );
    const stock: StockDto = await this.stockService.initStock(
      handgun.inStock,
      StockableObject.HANDGUN,
      created.id,
    );

    return this.mapEntityToDto(created, price, stock);
  }

  public async update(
    id: number,
    handgun: UpdateHandGunDto,
  ): Promise<HandGunDto> {
    const updateResult: HandGun = await this.handGunRepository.preload({
      id: id,
      ...handgun,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
      barrelType: handgun.barrelType,
      barrelColor: handgun.barrelColor,
      buttColor: handgun.buttColor,
      buttMaterial: handgun.buttMaterial,
      caliber: handgun.caliber,
      category: handgun.category,
      factory: handgun.factory,
      percussionType: handgun.percussionType,
      reference: this.createReference(handgun),
      slideColor: handgun.slideColor,
      slideMaterial: handgun.slideMaterial,
      threadedSize: handgun.threadedSize,
      triggerType: handgun.triggerType,
      type: handgun.type,
      isDiscounted: handgun.priceHistory.isDiscounted,
    });

    const updated: HandGun = await this.handGunRepository.save(updateResult);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        handgun.priceHistory,
        updated.id,
        PriceableObjectType.HANDGUN,
      );
    return this.mapEntityToDto(updated, price);
  }

  public async findById(id: number): Promise<HandGunDto> {
    const handGunEntity: HandGun = await this.handGunRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        slideMaterial: true,
        slideColor: true,
        factory: true,
        buttMaterial: true,
        buttColor: true,
        triggerType: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: {
          mode: true,
        },
        barrelType: true,
        providedOpticReadyPlate: true,
        barrelColor: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!handGunEntity) {
      throw new NotFoundException(CodeError.WEAPON_NOT_FOUND);
    }
    const price: PriceHistoryDto =
      await this.priceHistoryService.findLastByObjectId(
        handGunEntity.id,
        PriceableObjectType.HANDGUN,
      );
    const stock: StockDto = await this.stockService.findLastByObjectId(
      handGunEntity.id,
      StockableObject.HANDGUN,
    );
    return this.mapEntityToDto(handGunEntity, price, stock);
  }

  public async findAll(
    filters: HandGunFilter,
  ): Promise<PaginatedResponseDto<HandGunDto>> {
    const { limit = 10, offset = 0 } = filters;
    const where: FindOptionsWhere<HandGun> = buildWhereGeneric<
      HandGunFilter,
      HandGun
    >(filters, handGunWhereFilterConfig);
    const [entities, total] = await this.handGunRepository.findAndCount({
      where,
      relations: {
        slideMaterial: true,
        slideColor: true,
        factory: true,
        buttMaterial: true,
        buttColor: true,
        triggerType: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
        createdBy: true,
        updatedBy: true,
      },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
    const data = await this.mapEntityArrayToDtoArray(entities);
    return new PaginatedResponseDto<HandGunDto>(data, total, limit, offset);
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const handgun: HandGunDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      caliber: handgun.caliber,
      category: handgun.category,
      factory: handgun.factory,
      name: handgun.name,
      reference: handgun.reference,
      colors: `Crosse: ${handgun.buttColor.name}| Cullasse: ${handgun.slideColor.name}| Cannon: ${handgun.barrelColor.name}`,
      description: `Variante: ${handgun.variation ?? ''} | Type percussion: ${handgun.percussionType.name} | Type: ${handgun.type.name} | Description: ${handgun.description}`,
    };
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.handGunRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.HANDGUN,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
  }

  private async mapEntityToDto(
    handGun: HandGun,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<HandGunDto> {
    return {
      id: handGun.id,
      barrelLength: handGun.barrelLength,
      name: handGun.name,
      description: handGun.description,
      type: handGun.type,
      threadedSize: handGun.threadedSize,
      reference: handGun.reference,
      adjustableTriggerMaxWeight: handGun.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: handGun.adjustableTriggerMinWeight,
      barrelType: handGun.barrelType,
      isAdjustableTrigger: handGun.isAdjustableTrigger,
      isOpticReady: handGun.isOpticReady,
      caliber: handGun.caliber,
      category: handGun.category,
      factory: handGun.factory,
      variation: handGun.variation,
      isThreadedBarrel: handGun.isThreadedBarrel,
      percussionType: handGun.percussionType,
      providedMagazineQuantity: handGun.providedMagazineQuantity,
      barrelSize: handGun.barrelSize,
      buttMaterial: handGun.buttMaterial,
      isAdjustableFrontSight: handGun.isAdjustableFrontSight,
      isAdjustableBackSight: handGun.isAdjustableBackSight,
      isPicatinyRailSlop: handGun.isPicatinyRailSlop,
      decocking: handGun.decocking,
      triggerType: handGun.triggerType,
      buttColor: handGun.buttColor,
      slideColor: handGun.slideColor,
      slideMaterial: handGun.slideMaterial,
      barrelColor: handGun.barrelColor,
      isExternalHammer: handGun.isExternalHammer,
      providedOpticReadyPlates: handGun.providedOpticReadyPlate,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            handGun.id,
            PriceableObjectType.HANDGUN,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            handGun.id,
            StockableObject.HANDGUN,
          ),
      stock: stock,
      createdBy: handGun.createdBy,
      updatedBy: handGun.updatedBy,
      createdAt: handGun.createdAt,
      updatedAt: handGun.updatedAt,
      isDiscounted: handGun.isDiscounted,
    };
  }
  public async findLastEntry(type: HandGunType): Promise<NewItemsDto | null> {
    const [entity] = await this.handGunRepository.find({
      where: {
        category: {
          name: 'B',
        },
        type: {
          name: type,
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
      name: entity.name,
      type: 'handgun',
      price: dto.priceHistory.currentSalePrice,
      id: entity.id,
      factory: dto.factory.name,
      sub: `Calibre: ${entity.caliber.name}, Categorie: ${entity.category.name}`,
      discountedPrice: dto.priceHistory.discountedPrice,
      category: dto.category,
    };
  }

  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities: HandGun[] = await this.handGunRepository.find({
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
    return dtos.map((dto: HandGunDto) => {
      return {
        name: dto.name,
        type: 'handgun',
        price: dto.priceHistory.currentSalePrice,
        id: dto.id,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
        sub: `Calibre: ${dto.caliber.name}, Categorie: ${dto.category.name}`,
        category: dto.category,
      };
    });
  }

  public async mapEntityArrayToDtoArray(
    handGuns: HandGun[],
  ): Promise<HandGunDto[]> {
    const dtoPromises = handGuns.map(async (handGun) => {
      return this.mapEntityToDto(handGun);
    });
    return await Promise.all(dtoPromises);
  }

  private createReference(dto: CreateHandGunDto): string {
    return `${dto.factory.reference.substring(0, 4)}-${dto.name}-${dto.caliber.reference}`;
  }

  /**
   * Verifie si l'arme est pas deja presente en base
   * @private
   * @param newEntity {CreateHandGunDto}
   */
  private async verifyIfIsExist(newEntity: CreateHandGunDto): Promise<boolean> {
    const handGun = await this.handGunRepository.findOne({
      where: {
        name: newEntity.name,
        variation: newEntity.variation,
        caliber: newEntity.caliber,
        factory: newEntity.factory,
      },
    });
    return !!handGun;
  }
}
