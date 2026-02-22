import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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
import { OpticFilter } from './filters/optic.filter';
import { PaginatedResponseDto } from '../decorator/paginated-response.decorator';
import { buildWhereGeneric } from '../database/utils/where-builder';
import { opticWhereFilterConfig } from './filters/optic-where-filter.config';
import { DiscountedItemDto, NewItemsDto } from '../dto/new-items.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OpticService {
  constructor(
    @InjectRepository(Optic)
    private readonly opticRepository: Repository<Optic>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  /**
   * Crée et persiste une nouvelle optique en base de données.
   *
   * Cette méthode :
   * - Vérifie qu'une optique identique n'existe pas déjà
   * - Crée l'entité `Optic` à partir du DTO fourni
   * - Génère une référence unique pour l'optique
   * - Initialise l'historique de prix associé
   * - Initialise le stock de l'optique
   * - Retourne l'optique créée sous forme de `OpticDto`
   *
   * @param optic - Données nécessaires à la création de l'optique
   *
   * @throws {BadRequestException}
   * Lancée si une optique identique existe déjà
   * (`CodeError.OPTIC_IS_EXIST`)
   *
   * @returns {Promise<OpticDto>}
   * L'optique créée, incluant :
   * - ses informations générales
   * - son prix courant
   * - son stock initial
   *
   * @remarks
   * - L'historique de prix est créé ou mis à jour via `PriceHistoryService`
   * - Le stock est initialisé via `StockService`
   * - La référence est générée automatiquement à la création
   *
   * @example
   * ```ts
   * const optic = await opticService.insert(createOpticDto);
   * ```
   */
  public async insert(optic: CreateOpticDto): Promise<OpticDto> {
    const isExist: boolean = await this.verifyIsNoExist(optic);
    if (isExist) {
      throw new BadRequestException(CodeError.OPTIC_IS_EXIST);
    }
    const entity: Optic = this.opticRepository.create({
      name: optic.name,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      maxZoom: optic.maxZoom,
      maxDrift: optic.maxDrift,
      maxElevation: optic.maxElevation,
      minZoom: optic.minZoom,
      description: optic.description,
      factory: optic.factory,
      clickValue: optic.clickValue,
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
      isDiscounted: optic.priceHistory.isDiscounted,
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

  /**
   * Met à jour une optique existante en base de données.
   *
   * Cette méthode :
   * - Charge l'entité `Optic` existante à partir de son identifiant
   * - Met à jour ses propriétés à partir du DTO fourni
   * - Régénère la référence de l'optique si nécessaire
   * - Met à jour ou ajoute une entrée dans l'historique de prix
   * - Retourne l'optique mise à jour sous forme de `OpticDto`
   *
   * @param id - Identifiant unique de l'optique à mettre à jour
   * @param optic - Données de mise à jour de l'optique
   *
   * @throws {EntityNotFoundException | Error}
   * Peut être levée si l'optique à mettre à jour n'existe pas
   * ou si une erreur survient lors de la sauvegarde
   *
   * @returns {Promise<OpticDto>}
   * L'optique mise à jour, incluant son prix courant
   *
   * @remarks
   * - La méthode `preload` permet de fusionner l'entité existante avec les nouvelles valeurs
   * - L'historique de prix est géré par `PriceHistoryService`
   * - La référence peut être recalculée lors de la mise à jour
   *
   * @example
   * ```ts
   * const optic = await opticService.edit(1, updateOpticDto);
   * ```
   */
  public async update(id: number, optic: UpdateOpticDto): Promise<OpticDto> {
    const updatedResult = await this.opticRepository.preload({
      id,
      ...optic,
      factory: optic.factory,
      clickValue: optic.clickValue,
      focalPlane: optic.focalPlane,
      opticUnit: optic.opticUnit,
      type: optic.opticType,
      providedOpticCollarSize: optic.providedOpticCollarSize,
      reference: await this.createReference(optic),
      isDiscounted: optic.priceHistory.isDiscounted,
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

  /**
   * Récupère une liste paginée d'optiques en fonction des filtres fournis.
   *
   * Cette méthode :
   * - Construit dynamiquement les conditions de recherche à partir du filtre
   * - Applique la pagination (`limit`, `offset`)
   * - Charge les relations nécessaires à la construction du DTO
   * - Trie les résultats par identifiant décroissant
   * - Retourne une réponse paginée de `OpticDto`
   *
   * @param filter - Filtres de recherche et paramètres de pagination
   *
   * @returns {Promise<PaginatedResponseDto<OpticDto>>}
   * Une réponse paginée contenant :
   * - la liste des optiques correspondantes
   * - le nombre total d'éléments
   * - la limite et l’offset appliqués
   *
   * @remarks
   * - Les conditions `where` sont construites via `buildWhereGeneric`
   * - Les relations sont chargées pour éviter les accès lazy
   * - La pagination est gérée via `take` et `skip`
   *
   * @example
   * ```ts
   * const optics = await opticService.findAll({
   *   limit: 10,
   *   offset: 0,
   *   factory: 2,
   * });
   * ```
   */
  public async findAll(
    filter: OpticFilter,
  ): Promise<PaginatedResponseDto<OpticDto>> {
    const { limit, offset } = filter;
    const where: FindOptionsWhere<Optic> = buildWhereGeneric<
      OpticFilter,
      Optic
    >(filter, opticWhereFilterConfig);

    const [entities, total] = await this.opticRepository.findAndCount({
      where,
      relations: {
        factory: {
          type: true,
        },
        focalPlane: true,
        opticUnit: true,
        type: true,
        providedOpticCollarSize: true,
        clickValue: {
          opticUnit: true,
        },
      },
      take: limit,
      skip: offset,
      order: {
        id: 'DESC',
      },
    });
    const data: OpticDto[] =
      await this.mapOpticsArrayToOpticsDtoArray(entities);
    return new PaginatedResponseDto<OpticDto>(data, total, limit, offset);
  }

  /**
   * Récupère une optique à partir de son identifiant unique.
   *
   * Cette méthode :
   * - Recherche l'optique en base de données par son identifiant
   * - Charge les relations nécessaires à la construction du DTO
   * - Récupère le dernier prix associé à l'optique
   * - Retourne l'optique sous forme de `OpticDto`
   *
   * @param id - Identifiant unique de l'optique à récupérer
   *
   * @throws {NotFoundException}
   * Lancée si aucune optique ne correspond à l'identifiant fourni
   * (`CodeError.OPTIC_NOT_FOUND`)
   *
   * @returns {Promise<OpticDto>}
   * L'optique trouvée, incluant ses informations détaillées et son prix courant
   *
   * @remarks
   * - Les relations sont chargées explicitement pour éviter le lazy loading
   * - Le prix retourné correspond à la dernière entrée de l'historique de prix
   *
   * @example
   * ```ts
   * const optic = await opticService.findById(1);
   * ```
   */
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
        clickValue: {
          opticUnit: true,
        },
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

  /**
   * Soft Delete de l'optique
   * @param id - Identifiant unique de l'optique
   */
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
   * Récupère la dernière optique créée en base de données.
   *
   * Cette méthode :
   * - Recherche l'optique la plus récemment créée
   * - Charge les relations nécessaires (fabricant)
   * - Transforme l'entité en un DTO simplifié destiné aux nouveautés
   * - Retourne `null` si aucune optique n'existe en base
   *
   * @returns {Promise<NewItemsDto | null>}
   * Un objet représentant la dernière optique créée, ou `null` si aucune donnée n'est disponible
   *
   * @remarks
   * - Le tri est effectué sur la date de création décroissante (`createdAt DESC`)
   * - Le DTO retourné est volontairement simplifié pour un affichage "nouveautés"
   * - Le prix correspond au prix courant issu de l'historique de prix
   *
   * @example
   * ```ts
   * const lastOptic = await opticService.findLastEntry();
   * if (lastOptic) {
   *   console.log(lastOptic.name);
   * }
   * ```
   */
  public async findLastEntry(): Promise<NewItemsDto | null> {
    const [entity] = await this.opticRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
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
      type: 'optic',
      id: entity.id,
      price: dto.priceHistory.currentSalePrice,
      sub: `${entity.minZoom}-${entity.maxZoom}X${entity.lensDiameter}`,
      factory: dto.factory.name,
    };
  }

  /**
   * Récupère une liste d'optiques actuellement en promotion.
   *
   * Cette méthode :
   * - Recherche les optiques marquées comme étant en promotion
   * - Limite le nombre de résultats retournés
   * - Charge les relations nécessaires (fabricant)
   * - Transforme les entités en DTOs dédiés à l'affichage des promotions
   *
   * @param limit - Nombre maximum d'éléments retournés (par défaut : 5)
   *
   * @returns {Promise<DiscountedItemDto[] | null>}
   * Une liste d'optiques en promotion ou `null` si aucune donnée n'est disponible
   *
   * @remarks
   * - Seules les optiques avec `isDiscounted = true` sont retournées
   * - Le prix et la remise sont issus du dernier historique de prix
   * - Le DTO retourné est volontairement allégé pour un affichage "promotions"
   *
   * @example
   * ```ts
   * const discountedOptics = await opticService.findDiscountedItems(10);
   * ```
   */
  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities: Optic[] = await this.opticRepository.find({
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
    const dtos = await this.mapOpticsArrayToOpticsDtoArray(entities);
    return dtos.map((dto: OpticDto) => {
      return {
        name: dto.name,
        type: 'optic',
        id: dto.id,
        price: dto.priceHistory.currentSalePrice,
        sub: `${dto.minZoom}-${dto.maxZoom}X${dto.lensDiameter}`,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
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
      clickValue: optic.clickValue,
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
      createdBy: this.userService.mapEntityToDto(optic.createdBy),
      updatedBy: this.userService.mapEntityToDto(optic.updatedBy),
      createdAt: optic.createdAt,
      updatedAt: optic.updatedAt,
      isDiscounted: optic.isDiscounted,
    };
  }

  private async verifyIsNoExist(dto: CreateOpticDto): Promise<boolean> {
    const optic: Optic = await this.opticRepository.findOne({
      where: {
        name: dto.name,
        maxZoom: dto.maxZoom,
        minZoom: dto.minZoom,
        bodyDiameter: dto.bodyDiameter,
        lensDiameter: dto.lensDiameter,
        factory: {
          id: dto.factory.id,
        },
      },
    });
    return !!optic;
  }

  private async createReference(optic: CreateOpticDto): Promise<string> {
    return `${optic.factory.reference.toUpperCase()}-${optic.name.substring(0 - 3)}/${optic.minZoom}-${optic.maxZoom}X${optic.lensDiameter}`;
  }
}
