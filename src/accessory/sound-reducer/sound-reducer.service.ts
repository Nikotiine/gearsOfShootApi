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
import { HandGunDto } from '../../dto/hand-gun.dto';
import { SoundNoiseFilter } from './filters/sound-noise.reducer.filter';
import { buildWhereGeneric } from '../../database/utils/where-builder';
import { soundNoiseFilterConfig } from './filters/sound-noise-where-filter.config';
import { PaginatedResponseDto } from '../../decorator/paginated-response.decorator';
import { AmmunitionDto } from '../../dto/ammunition.dto';

@Injectable()
export class SoundReducerService {
  constructor(
    @InjectRepository(SoundNoiseReducer)
    private readonly soundNoiseReducerRepository: Repository<SoundNoiseReducer>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

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

  public async insert(
    soundNoiseReducer: CreateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const entity = this.soundNoiseReducerRepository.create({
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
    });
    const created = await this.soundNoiseReducerRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
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

  public async findById(id: number): Promise<SoundNoiseReducerDto> {
    const soundNoiseReducer = await this.soundNoiseReducerRepository.findOne({
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

  public async edit(
    id: number,
    soundNoiseReducer: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const updateResult = await this.soundNoiseReducerRepository.preload({
      id,
      ...soundNoiseReducer,
      factory: soundNoiseReducer.factory,
      threadedSize: soundNoiseReducer.threadedSize,
      caliber: soundNoiseReducer.caliber,
      description: soundNoiseReducer.description,
      reference: await this.createReference(soundNoiseReducer),
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
      createdBy: soundNoiseReducer.createdBy,
      updatedBy: soundNoiseReducer.updatedBy,
      createdAt: soundNoiseReducer.createdAt,
      updatedAt: soundNoiseReducer.updatedAt,
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
}
