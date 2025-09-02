import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Riffle } from '../../database/entity/riffle.entity';
import { Repository } from 'typeorm';
import {
  CreateRiffleDto,
  RiffleDto,
  UpdateRiffleDto,
} from '../../dto/riffle.dto';

import { CodeError } from '../../enum/code-error.enum';

import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { PriceHistoryService } from '../../common/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { StockDto } from '../../dto/stock.dto';
import { StockableObject } from '../../enum/stock-item.enum';
import { StockService } from '../../sale/stock/stock.service';

@Injectable()
export class RiffleService {
  constructor(
    @InjectRepository(Riffle)
    private readonly riffleRepository: Repository<Riffle>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

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
    });

    const updated = await this.riffleRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      riffle.priceHistory,
      updated.id,
      PriceableObjectType.RIFFLE,
    );
    return this.mapEntityToDto(updated, price);
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

  public async findAll(): Promise<RiffleDto[]> {
    const riffles = await this.riffleRepository.find({
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
    });
    return this.mapEntityArrayToDtoArray(riffles);
  }

  public async findAllByCategory(category: string): Promise<RiffleDto[]> {
    const riffles = await this.riffleRepository.find({
      where: {
        category: {
          name: category,
        },
      },
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
    });
    return this.mapEntityArrayToDtoArray(riffles);
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
      createdBy: riffle.createdBy,
      updatedBy: riffle.updatedBy,
      createdAt: riffle.createdAt,
      updatedAt: riffle.updatedAt,
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

  private createReference(dto: CreateRiffleDto): string {
    return `${dto.factory.reference.substring(0, 4)}-${dto.name}-${dto.caliber.reference}`;
  }
}
