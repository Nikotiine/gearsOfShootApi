import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';
import { Repository } from 'typeorm';
import { CreateOpticDto, OpticDto, UpdateOpticDto } from '../dto/optic.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { CodeError } from '../enum/code-error.enum';
import { PriceHistoryDto } from '../dto/price-history.dto';
import { PriceHistoryService } from '../sale/price-history/price-history.service';
import { PriceableObjectType } from '../enum/priceable-object-type.enum';
import { StockService } from '../sale/stock/stock.service';
import { StockDto } from '../dto/stock.dto';
import { StockableObject } from '../enum/stock-item.enum';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../dto/item-invoice-supplier.dto';
import { WeaponMagazineDto } from '../dto/weapon-magazine.dto';

@Injectable()
export class OpticService {
  constructor(
    @InjectRepository(Optic)
    private readonly opticRepository: Repository<Optic>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

  //TODO: Mettre la contrainte d unicite
  public async insert(optic: CreateOpticDto): Promise<OpticDto> {
    const entity = this.opticRepository.create({
      name: optic.name,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      maxZoom: optic.maxZoom,
      maxDrift: optic.maxDrift,
      maxElevation: optic.maxElevation,
      minZoom: optic.minZoom,
      description: optic.description,
      factory: optic.factory,
      valueOfOneClick: optic.valueOfOneClick,
      lensDiameter: optic.lensDiameter,
      isParallax: optic.isParallax,
      bodyDiameter: optic.bodyDiameter,
      focalPlane: optic.focalPlane,
      opticUnit: optic.opticUnit,
      type: optic.opticType,
      length: optic.length,
      eyeRelief: optic.eyeRelief,
      isCollarsProvided: optic.isCollarsProvided,
      providedOpticCollarSize: optic.providedOpticCollarSize,
      reference: await this.createReference(optic),
    });
    const created = await this.opticRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      optic.priceHistory,
      created.id,
      PriceableObjectType.OPTIC,
    );
    const stock: StockDto = await this.stockService.initStock(
      optic.inStock,
      StockableObject.OPTIC,
      created.id,
    );
    return await this.mapEntityToDto(created, price, stock);
  }

  public async findById(id: number): Promise<OpticDto> {
    const optic = await this.opticRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: {
          type: true,
        },
        focalPlane: true,
        opticUnit: true,
        type: true,
        providedOpticCollarSize: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!optic) {
      throw new NotFoundException(CodeError.OPTIC_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      optic.id,
      PriceableObjectType.OPTIC,
    );
    return this.mapEntityToDto(optic, price);
  }

  public async findAll(): Promise<OpticDto[]> {
    const optics = await this.opticRepository.find({
      relations: {
        factory: {
          type: true,
        },
        focalPlane: true,
        opticUnit: true,
        type: true,
        providedOpticCollarSize: true,
      },
    });
    return this.mapOpticsArrayToOpticsDtoArray(optics);
  }

  public async edit(id: number, optic: UpdateOpticDto): Promise<OpticDto> {
    const updatedResult = await this.opticRepository.preload({
      id,
      ...optic,
      factory: optic.factory,
      valueOfOneClick: optic.valueOfOneClick,
      focalPlane: optic.focalPlane,
      opticUnit: optic.opticUnit,
      type: optic.opticType,
      providedOpticCollarSize: optic.providedOpticCollarSize,
      reference: await this.createReference(optic),
    });
    const updated: Optic = await this.opticRepository.save(updatedResult);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        optic.priceHistory,
        id,
        PriceableObjectType.OPTIC,
      );
    return this.mapEntityToDto(updated, price);
  }

  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.OPTIC,
      );
    }
    return {
      id: id,
      message: CodeSuccess.OPTIC_SOFT_DELETE,
      isSuccess: deleted.affected > 0,
    };
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const optic: OpticDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      factory: optic.factory,
      name: `${optic.name} | ${optic.minZoom}-${optic.maxZoom}X${optic.lensDiameter}`,
      reference: optic.reference,
      description: `Plan focal: ${optic.focalPlane.name ?? ''} | Type: ${optic.opticType.name} | Description: ${optic.description}`,
    };
  }

  private async mapOpticsArrayToOpticsDtoArray(
    optics: Optic[],
  ): Promise<OpticDto[]> {
    const dtoPromises = optics.map(async (optic) => {
      return this.mapEntityToDto(optic);
    });
    return await Promise.all(dtoPromises);
  }

  /**
   * Transforme l objet Optic en {OpticDto}
   * @param optic {Optic}
   * @param price
   * @param stock
   * @private
   */
  private async mapEntityToDto(
    optic: Optic,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<OpticDto> {
    return {
      id: optic.id,
      name: optic.name,
      description: optic.description,
      maxZoom: optic.maxZoom,
      minZoom: optic.minZoom,
      maxElevation: optic.maxElevation,
      maxDrift: optic.maxDrift,
      lensDiameter: optic.lensDiameter,
      bodyDiameter: optic.bodyDiameter,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      valueOfOneClick: optic.valueOfOneClick,
      factory: optic.factory,
      opticUnit: optic.opticUnit,
      focalPlane: optic.focalPlane,
      isParallax: optic.isParallax,
      opticType: optic.type,
      reference: optic.reference,
      length: optic.length,
      isCollarsProvided: optic.isCollarsProvided,
      eyeRelief: optic.eyeRelief,
      providedOpticCollarSize: optic.providedOpticCollarSize,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            optic.id,
            PriceableObjectType.OPTIC,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            optic.id,
            StockableObject.OPTIC,
          ),
      stock: stock,
      createdBy: optic.createdBy,
      updatedBy: optic.updatedBy,
      createdAt: optic.createdAt,
      updatedAt: optic.updatedAt,
    };
  }

  private async createReference(optic: CreateOpticDto): Promise<string> {
    return `${optic.factory.reference.toUpperCase()}-${optic.name.substring(0 - 3)}/${optic.minZoom}-${optic.maxZoom}X${optic.lensDiameter}`;
  }
}
