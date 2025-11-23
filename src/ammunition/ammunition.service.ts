import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { ILike, Repository } from 'typeorm';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  UpdateAmmunitionDto,
} from '../dto/ammunition.dto';
import { CodeError } from '../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { PriceHistoryService } from '../sale/price-history/price-history.service';
import { PriceableObjectType } from '../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../dto/price-history.dto';
import { StockService } from '../sale/stock/stock.service';
import { StockableObject } from '../enum/stock-item.enum';
import { StockDto } from '../dto/stock.dto';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../dto/item-invoice-supplier.dto';
import { AmmunitionFilter } from '../dto/filter/ammunition.filter';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
  ) {}

  /**
   * Insertion d'une nouvelle munition en bdd
   * @param ammunition {CreateAmmunitionDto}
   */
  public async insert(ammunition: CreateAmmunitionDto): Promise<AmmunitionDto> {
    const isExist = await this.verifyIfNotExist(
      ammunition.name,
      ammunition.factory.id,
      ammunition.packaging,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_IS_EXIST);
    }
    const entity = this.ammunitionRepository.create({
      name: ammunition.name,
      description: ammunition.description,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      caliber: ammunition.caliber,
      category: ammunition.category,
      factory: ammunition.factory,
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: this.createReference(ammunition),
    });
    const created: Ammunition = await this.ammunitionRepository.save(entity);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        ammunition.priceHistory,
        created.id,
        PriceableObjectType.AMMUNITION,
      );
    const stock: StockDto = await this.stockService.initStock(
      ammunition.inStock,
      StockableObject.AMMUNITION,
      created.id,
    );
    return this.mapEntityToDto(created, price, stock);
  }

  /**
   * Retourne la liste des munitions filtrer par calibre
   * @param caliberId {number} id du calibre
   */
  public async findByCaliber(caliberId: number): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        caliber: {
          id: caliberId,
        },
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    return this.mapEntityArrayToDtoArray(ammunitions);
  }

  public async findById(id: number): Promise<AmmunitionDto> {
    const ammunition = await this.ammunitionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!ammunition) {
      throw new NotFoundException(CodeError.AMMUNITION_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      ammunition.id,
      PriceableObjectType.AMMUNITION,
    );
    const stock = await this.stockService.findLastByObjectId(
      ammunition.id,
      StockableObject.AMMUNITION,
    );
    return this.mapEntityToDto(ammunition, price, stock);
  }

  public async edit(
    id: number,
    ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    const updatedResult = await this.ammunitionRepository.preload({
      id,
      ...ammunition,
      reference: this.createReference(ammunition),
      caliber: ammunition.caliber,
      factory: ammunition.factory,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      percussionType: ammunition.percussionType,
    });
    const updated: Ammunition =
      await this.ammunitionRepository.save(updatedResult);
    const price: PriceHistoryDto =
      await this.priceHistoryService.addPriceHistoryIfNewOrUpdated(
        ammunition.priceHistory,
        ammunition.id,
        PriceableObjectType.AMMUNITION,
      );
    return this.mapEntityToDto(updated, price);
  }

  /**
   * Retourne les munition suivant leurs categorisation
   * @param category
   */
  public async findByCategory(category: string): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        category: {
          name: category,
        },
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return await this.mapEntityArrayToDtoArray(ammunitions);
  }

  public async findAll(
    filter: AmmunitionFilter,
  ): Promise<PaginatedResponseDto<AmmunitionDto>> {
    const {
      category,
      factory,
      caliber,
      limit = 10,
      offset = 0,
      name,
      reference,
    } = filter;

    // Construction dynamique du "where"
    const where: any = {};
    if (category) where.category = { name: ILike(`%${category}%`) };
    if (factory) where.factory = { name: ILike(`%${factory}%`) };
    if (caliber) where.caliber = { name: ILike(`%${caliber}%`) };
    if (name) where.name = ILike(`%${name}%`);
    if (reference) where.reference = ILike(`%${reference}%`);

    const [entities, total] = await this.ammunitionRepository.findAndCount({
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

    const dtoList = await this.mapEntityArrayToDtoArray(entities);

    return new PaginatedResponseDto<AmmunitionDto>(
      dtoList,
      total,
      limit,
      offset,
    );
  }

  /**
   * Soft delete de la munition
   * @param id {number} id de la munition
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.ammunitionRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.AMMUNITION,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.AMMUNITION_DELETE,
    };
  }

  public async convertToInvoiceDto(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoice> {
    const ammo: AmmunitionDto = await this.findById(item.objectId);
    return {
      id: item.id,
      quantity: item.quantity,
      status: item.status,
      unitPriceHt: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      caliber: ammo.caliber,
      category: ammo.category,
      factory: ammo.factory,
      name: ammo.name,
      reference: ammo.reference,
      description: `Packaging: ${ammo.packaging} | Type percussion: ${ammo.percussionType.name} | Ogive: ${ammo.headType.name} | Description: ${ammo.description}`,
    };
  }

  /**
   * Creer la reference unique de l'arme pour a gestion des stock / recherche ect..
   * @private
   * @param ammunition {CreateAmmunitionDto}
   */
  private createReference(ammunition: CreateAmmunitionDto): string {
    return `${ammunition.factory.reference.toUpperCase()}-${ammunition.caliber.reference.toUpperCase()}-${ammunition.name.substring(0, 4).toUpperCase()}-${ammunition.headType.reference.toUpperCase()}`;
  }

  /**
   * Verifie que la munition n'existe pas deja en base de donnee
   * @param name {string} nom de la munition
   * @param factoryId {number} id de la marque
   * @param packaging {number} le packaging de la boite
   * @private
   */
  private async verifyIfNotExist(
    name: string,
    factoryId: number,
    packaging: number,
  ): Promise<boolean> {
    const ammunition = await this.ammunitionRepository.findOne({
      where: {
        name: name,
        factory: {
          id: factoryId,
        },
        packaging: packaging,
      },
    });
    return !!ammunition;
  }

  /**
   * Transforme une entité `Ammunition` en un objet `AmmunitionDto`.
   *
   * Cette méthode extrait et mappe les propriétés pertinentes de l'entité `Ammunition`
   * vers un objet conforme au DTO `AmmunitionDto`. Si des données externes sont requises
   * (comme l'historique de prix), elles sont récupérées de manière asynchrone.
   *
   * @param {Ammunition} ammunition - L'entité `Ammunition` à transformer.
   * @param price
   * @param stock
   * @returns {Promise<AmmunitionDto>} Une promesse résolue avec le DTO correspondant.
   */
  private async mapEntityToDto(
    ammunition: Ammunition,
    price?: PriceHistoryDto,
    stock?: StockDto,
  ): Promise<AmmunitionDto> {
    return {
      id: ammunition.id,
      name: ammunition.name,
      description: ammunition.description,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      caliber: ammunition.caliber,
      category: ammunition.category,
      factory: ammunition.factory,
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: ammunition.reference,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            ammunition.id,
            PriceableObjectType.AMMUNITION,
          ),
      inStock: stock
        ? stock.quantity
        : await this.stockService.findCurrentQuantity(
            ammunition.id,
            StockableObject.AMMUNITION,
          ),
      stock: stock,
      createdBy: ammunition.createdBy,
      updatedBy: ammunition.updatedBy,
      createdAt: ammunition.createdAt,
      updatedAt: ammunition.updatedAt,
    };
  }

  /**
   * Convertit un tableau d'entités `Ammunition` en un tableau de DTOs `AmmunitionDto`.
   *
   * Cette méthode utilise la méthode `mapEntityToDto` pour transformer chaque entité
   * de type `Ammunition` en son équivalent `AmmunitionDto`. Elle exécute ces transformations
   * de manière asynchrone et attend que toutes soient terminées avant de renvoyer le résultat.
   *
   * @param {Ammunition[]} ammunitions - Le tableau d'entités `Ammunition` à transformer.
   * @returns {Promise<AmmunitionDto[]>} Une promesse résolue avec le tableau de DTOs correspondants.
   */
  private async mapEntityArrayToDtoArray(
    ammunitions: Ammunition[],
  ): Promise<AmmunitionDto[]> {
    const dtoPromises = ammunitions.map(async (ammunition) => {
      return this.mapEntityToDto(ammunition);
    });
    return await Promise.all(dtoPromises);
  }
}
