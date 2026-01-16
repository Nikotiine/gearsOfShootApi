import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponMagazine } from '../../database/entity/weapon-magazine.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  CreateWeaponMagazineDto,
  UpdateWeaponMagazineDto,
  WeaponMagazineDto,
} from '../../dto/weapon-magazine.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { RiffleService } from '../riffle/riffle.service';
import { HandGunService } from '../hand-gun/hand-gun.service';
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
import { MagazineFilter } from './filters/magazine.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { magazineFilterConfig } from './filters/magazine-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { DiscountedItemDto, NewItemsDto } from '../../dto/new-items.dto';
import { LegislationCategory } from '../../types/legislation-category.type';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(WeaponMagazine)
    private readonly weaponMagazineRepository: Repository<WeaponMagazine>,
    private readonly riffleService: RiffleService,
    private readonly handGunService: HandGunService,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

  /**
   * Ajout d'un nouveau chargeur en bdd
   * TODO: Verifier l unicite
   * @param magazine
   */
  public async insert(
    magazine: CreateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    const entity = this.weaponMagazineRepository.create({
      width: magazine.width,
      height: magazine.height,
      caliber: magazine.caliber,
      factory: magazine.factory,
      body: magazine.body,
      capacity: magazine.capacity,
      length: magazine.length,
      reference: await this.createReference(magazine),
      category: magazine.category,
      riffles: magazine.compatibleRiffle,
      handguns: magazine.compatibleHandGun,
      forWeaponType: magazine.weaponType,
      isDiscounted: magazine.priceHistory.isDiscounted,
    });
    const created = await this.weaponMagazineRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      magazine.priceHistory,
      created.id,
      PriceableObjectType.MAGAZINE,
    );
    const stock: StockDto = await this.stockService.initStock(
      magazine.inStock,
      StockableObject.MAGAZINE,
      created.id,
    );
    return this.mapEntityToDto(created, price, stock);
  }

  public async edit(
    id: number,
    magazine: UpdateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    const updateResult = await this.weaponMagazineRepository.preload({
      id,
      ...magazine,
      caliber: magazine.caliber,
      factory: magazine.factory,
      body: magazine.body,
      length: magazine.length,
      reference: await this.createReference(magazine),
      height: magazine.height,
      capacity: magazine.capacity,
      width: magazine.width,
      category: magazine.category,
      forWeaponType: magazine.weaponType,
      isDiscounted: magazine.priceHistory.isDiscounted,
    });
    const updated: WeaponMagazine =
      await this.weaponMagazineRepository.save(updateResult);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        magazine.priceHistory,
        id,
        PriceableObjectType.MAGAZINE,
      );
    return this.mapEntityToDto(updated, price);
  }

  /**
   * Retourne tous les chargeur disponible
   */
  public async findAll(
    filters: MagazineFilter,
  ): Promise<PaginatedResponseDto<WeaponMagazineDto>> {
    const { limit = 10, offset = 0 } = filters;
    const where: FindOptionsWhere<WeaponMagazine> = buildWhereGeneric<
      MagazineFilter,
      WeaponMagazine
    >(filters, magazineFilterConfig);
    const [entities, total] = await this.weaponMagazineRepository.findAndCount({
      where,
      relations: {
        caliber: true,
        factory: true,
        category: true,
      },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
    const data: WeaponMagazineDto[] =
      await this.mapEntityArrayToDtoArray(entities);
    return new PaginatedResponseDto<WeaponMagazineDto>(
      data,
      total,
      limit,
      offset,
    );
  }

  public async findById(id: number): Promise<WeaponMagazineDto> {
    const magazine = await this.weaponMagazineRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        createdBy: true,
        updatedBy: true,
        handguns: {
          factory: true,
          type: true,
        },
        riffles: {
          factory: true,
          type: true,
        },
        forWeaponType: true,
      },
    });
    return this.mapEntityToDto(magazine);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.weaponMagazineRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.MAGAZINE,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.MAGAZINE_DELETE,
    };
  }

  public async findLastEntry(
    category: LegislationCategory,
  ): Promise<NewItemsDto | null> {
    const [entity] = await this.weaponMagazineRepository.find({
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
        body: true,
      },
    });
    if (!entity) {
      return null;
    }
    const dto = await this.mapEntityToDto(entity);

    return {
      name: entity.reference,
      type: 'ammunition',
      price: dto.priceHistory.currentSalePrice,
      id: entity.id,
      factory: dto.factory.name,
      sub: `Calibre: ${dto.caliber.name}, Capacité: ${dto.capacity}, Matiere:${dto.body.name}`,
    };
  }

  public async findDiscountedItems(
    limit: number = 2,
  ): Promise<DiscountedItemDto[]> {
    const entities = await this.weaponMagazineRepository.find({
      where: {
        isDiscounted: true,
      },
      relations: {
        caliber: true,
        factory: true,
        category: true,
        body: true,
      },
      take: limit,
    });
    const dtos = await this.mapEntityArrayToDtoArray(entities);
    return dtos.map((dto: WeaponMagazineDto) => {
      return {
        id: dto.id,
        name: dto.reference,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
        type: 'magazine',
        price: dto.priceHistory.currentSalePrice,
        sub: `Calibre: ${dto.caliber.name}, Capacité: ${dto.capacity}, Matiere:${dto.body.name}`,
      };
    });
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const magazine: WeaponMagazineDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      caliber: magazine.caliber,
      category: magazine.category,
      factory: magazine.factory,
      name: `${magazine.factory.name} | ${magazine.caliber.name} | ${magazine.capacity}`,
      reference: magazine.reference,
      description: `Contenance: ${magazine.capacity ?? ''} | Matiere: ${magazine.body.name} | Description: ${magazine.description}`,
    };
  }

  /**
   * Transforme un tableau de chargeur ( entite bdd ) en DTO
   * @param magazines
   * @private
   */
  private async mapEntityArrayToDtoArray(
    magazines: WeaponMagazine[],
  ): Promise<WeaponMagazineDto[]> {
    const dtoPromises = magazines.map(async (magazine) => {
      return this.mapEntityToDto(magazine);
    });
    return await Promise.all(dtoPromises);
  }

  private async mapEntityToDto(
    magazine: WeaponMagazine,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<WeaponMagazineDto> {
    return {
      id: magazine.id,
      body: magazine.body,
      caliber: magazine.caliber,
      factory: magazine.factory,
      reference: magazine.reference,
      height: magazine.height,
      length: magazine.length,
      width: magazine.width,
      capacity: magazine.capacity,
      category: magazine.category,
      compatibleRiffle: magazine.riffles
        ? await this.riffleService.mapEntityArrayToDtoArray(magazine.riffles)
        : [],
      compatibleHandGun: magazine.handguns
        ? await this.handGunService.mapEntityArrayToDtoArray(magazine.handguns)
        : [],
      weaponType: magazine.forWeaponType,
      description: magazine.description,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            magazine.id,
            PriceableObjectType.MAGAZINE,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            magazine.id,
            StockableObject.MAGAZINE,
          ),
      stock: stock,
      createdBy: magazine.createdBy,
      updatedBy: magazine.updatedBy,
      createdAt: magazine.createdAt,
      updatedAt: magazine.updatedAt,
      isDiscounted: magazine.isDiscounted,
    };
  }

  public async findByFactory(
    factoryName: string,
  ): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        factory: {
          name: factoryName,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  public async findByRiffleCompatibility(
    riffleId: number,
  ): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        riffles: {
          id: riffleId,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  public async findByCategory(category: string): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        category: {
          name: category,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  private async createReference(
    magazine: CreateWeaponMagazineDto,
  ): Promise<string> {
    return `${magazine.factory.reference.substring(0, 3)}-${magazine.caliber.reference.toUpperCase()}-${magazine.capacity}/${magazine.body.reference}`;
  }
}
