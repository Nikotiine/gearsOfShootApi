import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoundNoiseReducer } from '../../database/entity/sound-noise-reducer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  CreateSoundNoiseReducerDto,
  SoundNoiseReducerDto,
  UpdateSoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';
import { PriceHistoryService } from '../../sale/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { StockService } from '../../sale/stock/stock.service';
import { StockDto } from '../../dto/stock.dto';
import { StockableObject } from '../../enum/stock-item.enum';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../../dto/item-invoice-supplier.dto';
import { SoundNoiseFilter } from './filters/sound-noise.reducer.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { soundNoiseFilterConfig } from './filters/sound-noise-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { DiscountedItemDto, NewItemsDto } from '../../dto/new-items.dto';
import { UserService } from '../../user/user.service';
import { ItemsInStockResult } from '../../utils/interface/ItemsInStockResult.interface';

@Injectable()
export class SoundReducerService {
  constructor(
    @InjectRepository(SoundNoiseReducer)
    private readonly soundNoiseReducerRepository: Repository<SoundNoiseReducer>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  public async insert(
    soundNoiseReducer: CreateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const entity: SoundNoiseReducer = this.soundNoiseReducerRepository.create({
      name: soundNoiseReducer.name,
      caliber: soundNoiseReducer.caliber,
      factory: soundNoiseReducer.factory,
      threadedSize: soundNoiseReducer.threadedSize,
      diameter: soundNoiseReducer.diameter,
      description: soundNoiseReducer.description,
      reference: await this.createReference(soundNoiseReducer),
      isCleanable: soundNoiseReducer.isCleanable,
      length: soundNoiseReducer.length,
      chicane: soundNoiseReducer.chicane,
      estimatedNoiseReduction: soundNoiseReducer.estimatedNoiseReduction,
      isDiscounted: soundNoiseReducer.priceHistory.isDiscounted,
    });
    const created: SoundNoiseReducer =
      await this.soundNoiseReducerRepository.save(entity);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        soundNoiseReducer.priceHistory,
        created.id,
        PriceableObjectType.RDS,
      );
    const stock: StockDto = await this.stockService.initStock(
      soundNoiseReducer.inStock,
      StockableObject.RDS,
      created.id,
    );
    return await this.mapEntityToDto(created, price, stock);
  }

  public async update(
    id: number,
    soundNoiseReducer: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const updateResult: SoundNoiseReducer =
      await this.soundNoiseReducerRepository.preload({
        id,
        ...soundNoiseReducer,
        factory: soundNoiseReducer.factory,
        threadedSize: soundNoiseReducer.threadedSize,
        caliber: soundNoiseReducer.caliber,
        description: soundNoiseReducer.description,
        reference: await this.createReference(soundNoiseReducer),
        isDiscounted: soundNoiseReducer.priceHistory.isDiscounted,
      });
    const updated: SoundNoiseReducer =
      await this.soundNoiseReducerRepository.save(updateResult);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
      soundNoiseReducer.priceHistory,
      id,
      PriceableObjectType.RDS,
    );
    return this.mapEntityToDto(updated, price);
  }

  /**
   * Retourne tous les reduceteur de sons
   */
  public async findAll(
    filter: SoundNoiseFilter,
  ): Promise<PaginatedResponseDto<SoundNoiseReducerDto>> {
    const { limit = 10, offset = 0 } = filter;
    const where: FindOptionsWhere<SoundNoiseReducer> = buildWhereGeneric<
      SoundNoiseFilter,
      SoundNoiseReducer
    >(filter, soundNoiseFilterConfig);
    const [entities, total] =
      await this.soundNoiseReducerRepository.findAndCount({
        where,
        relations: {
          caliber: true,
          threadedSize: true,
          factory: true,
        },
        take: limit,
        skip: offset,
        order: { id: 'DESC' },
      });
    const data: SoundNoiseReducerDto[] =
      await this.mapArrayEntityToArrayDto(entities);
    return new PaginatedResponseDto<SoundNoiseReducerDto>(
      data,
      total,
      limit,
      offset,
    );
  }

  public async findById(id: number): Promise<SoundNoiseReducerDto> {
    const soundNoiseReducer: SoundNoiseReducer =
      await this.soundNoiseReducerRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          caliber: true,
          factory: true,
          threadedSize: true,
          createdBy: true,
          updatedBy: true,
        },
      });
    if (!soundNoiseReducer) {
      throw new NotFoundException(CodeError.SOUND_NOISE_REDUCER_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      id,
      PriceableObjectType.RDS,
    );
    return this.mapEntityToDto(soundNoiseReducer, price);
  }
  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.soundNoiseReducerRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.RDS,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.SOUND_REDUCER_DELETE,
    };
  }

  /**
   * Convertie le dto pour l'affichage des factures/commandes
   * @param item CreateItemInvoiceSupplierDto
   */
  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const rds: SoundNoiseReducerDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      caliber: rds.caliber,
      factory: rds.factory,
      name: rds.name,
      reference: rds.reference,
      description: `Pas de vis: ${rds.threadedSize.size} | Diametre: ${rds.diameter} | Demontable: ${rds.isCleanable ? 'oui' : 'non'} | Description: ${rds.description}`,
    };
  }

  public async findLastEntry(): Promise<NewItemsDto | null> {
    const [entity] = await this.soundNoiseReducerRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        caliber: true,
        threadedSize: true,
        factory: true,
      },
      take: 1,
    });
    if (!entity) {
      return null;
    }
    const dto = await this.mapEntityToDto(entity);
    return {
      name: entity.name,
      type: 'rds',
      id: entity.id,
      price: dto.priceHistory.currentSalePrice,
      sub: `Calibre: ${dto.caliber.name} - Pas de vis: ${dto.threadedSize.size}`,
      factory: dto.factory.name,
    };
  }

  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities: SoundNoiseReducer[] =
      await this.soundNoiseReducerRepository.find({
        where: {
          isDiscounted: true,
        },
        relations: {
          caliber: true,
          factory: true,
        },
        take: limit,
      });
    if (!entities) {
      return null;
    }
    const dtos: SoundNoiseReducerDto[] =
      await this.mapArrayEntityToArrayDto(entities);
    return dtos.map((dto: SoundNoiseReducerDto) => {
      return {
        name: dto.name,
        type: 'rds',
        price: dto.priceHistory.currentSalePrice,
        id: dto.id,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
        sub: `Calibre: ${dto.caliber.name}, Gain db: ${dto.estimatedNoiseReduction}`,
      };
    });
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
      codeError: CodeError.SOUND_NOISE_OUT_OF_STOCK,
    };
  }
  private async mapArrayEntityToArrayDto(
    soundNoiseReducers: SoundNoiseReducer[],
  ): Promise<SoundNoiseReducerDto[]> {
    const dtoPromises = soundNoiseReducers.map(async (rds) => {
      return this.mapEntityToDto(rds);
    });
    return await Promise.all(dtoPromises);
  }

  /**
   * Mappe une entité `SoundNoiseReducer` vers un objet DTO `SoundNoiseReducerDto`.
   *
   * Cette méthode est utilisée pour transformer une entité de base de données ou métier
   * en un Data Transfer Object (DTO)
   * @private
   * @param {SoundNoiseReducer} soundNoiseReducer - L'entité représentant un réducteur de son.
   * @param price
   * @param stock
   * @returns {SoundNoiseReducerDto} L'objet DTO contenant les données du réducteur de son.
   */
  private async mapEntityToDto(
    soundNoiseReducer: SoundNoiseReducer,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<SoundNoiseReducerDto> {
    return {
      id: soundNoiseReducer.id,
      factory: soundNoiseReducer.factory,
      caliber: soundNoiseReducer.caliber,
      length: soundNoiseReducer.length,
      description: soundNoiseReducer.description,
      name: soundNoiseReducer.name,
      diameter: soundNoiseReducer.diameter,
      isCleanable: soundNoiseReducer.isCleanable,
      threadedSize: soundNoiseReducer.threadedSize,
      reference: soundNoiseReducer.reference,
      chicane: soundNoiseReducer.chicane,
      estimatedNoiseReduction: soundNoiseReducer.estimatedNoiseReduction,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            soundNoiseReducer.id,
            PriceableObjectType.RDS,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            soundNoiseReducer.id,
            StockableObject.RDS,
          ),
      stock: stock,
      createdBy: this.userService.mapEntityToDto(soundNoiseReducer.createdBy),
      updatedBy: this.userService.mapEntityToDto(soundNoiseReducer.updatedBy),
      createdAt: soundNoiseReducer.createdAt,
      updatedAt: soundNoiseReducer.updatedAt,
      isDiscounted: soundNoiseReducer.isDiscounted,
    };
  }

  /**
   * Génère une référence unique pour un réducteur de son à partir des données fournies.
   *
   * Cette méthode construit une chaîne de référence en combinant le nom du réducteur,
   * une partie de la référence de la fabrique, la référence du calibre et celle du filetage.
   * Elle interroge les services associés pour récupérer les valeurs nécessaires.
   *
   * Format retourné : `<name>-<factoryRef[0..2]>-<caliberRef>/<threadSizeRef>`
   * Exemple : `SilentMax-FAC-9MM/M13x1`
   *
   * @private
   * @async
   * @param {CreateSoundNoiseReducerDto} rds - Données nécessaires à la création du réducteur de son.
   * @returns {Promise<string>} Une promesse résolue avec la référence générée.
   */
  private async createReference(
    rds: CreateSoundNoiseReducerDto,
  ): Promise<string> {
    return `${rds.name}-${rds.factory.reference.substring(0, 3)}-${rds.caliber.reference}/${rds.threadedSize.reference}`;
  }

  /**
   * Vérifie si un réducteur de son avec les mêmes propriétés existe déjà.
   *
   * @private
   * @param {CreateSoundNoiseReducerDto} rds - Données du réducteur à vérifier.
   * @throws {BadRequestException} Si un réducteur avec le même nom, fabrique et filetage existe.
   */
  private async ensureSoundNoiseReducerDoesNotExist(
    rds: CreateSoundNoiseReducerDto,
  ): Promise<void> {
    const isExist = await this.soundNoiseReducerRepository.findOne({
      where: {
        name: rds.name,
        factory: rds.factory,
        threadedSize: rds.threadedSize,
      },
    });

    if (isExist) {
      throw new BadRequestException(CodeError.SOUND_NOISE_EXIST);
    }
  }
}
