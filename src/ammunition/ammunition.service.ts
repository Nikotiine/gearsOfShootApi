import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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
import { AmmunitionFilter } from './filters/ammunition.filter';
import { PaginatedResponseDto } from '../decorator/paginated-response.decorator';
import { buildWhereGeneric } from '../database/utils/where-builder';
import { ammunitionWhereFilterConfig } from './filters/ammunition-where-filter.config';
import { DiscountedItemDto, NewItemsDto } from '../dto/new-items.dto';
import { LegislationCategory } from '../types/legislation-category.type';
import { UserService } from '../user/user.service';
import { ItemsInStockResult } from '../utils/interface/ItemsInStockResult.interface';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
    private readonly priceHistoryService: PriceHistoryService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
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
      isDiscounted: ammunition.priceHistory.isDiscounted,
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
   * Met à jour une munition existante et renvoie son DTO mis à jour.
   *
   * Cette méthode :
   * 1. Précharge l'entité existante en fusionnant l'ID et les nouvelles données du DTO `UpdateAmmunitionDto`.
   * 2. Met automatiquement à jour la référence via `createReference`.
   * 3. Met à jour les relations associées (caliber, factory, headType, bodyType, percussionType).
   * 4. Enregistre la munition mise à jour en base.
   * 5. Met à jour l'historique des prix si le prix a changé, via `priceHistoryService`.
   * 6. Convertit l'entité mise à jour en DTO pour la réponse.
   *
   * @param {number} id - Identifiant de la munition à modifier.
   * @param {UpdateAmmunitionDto} ammunition - Données de mise à jour de la munition.
   *
   * @returns {Promise<AmmunitionDto>} Le DTO de la munition mise à jour, incluant
   * les informations de prix actualisées.
   *
   * @throws {NotFoundException} Si la munition à mettre à jour n'existe pas.
   */
  public async update(
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
      isDiscounted: ammunition.priceHistory.isDiscounted,
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
   * Récupère une liste paginée de munitions selon différents filtres.
   *
   * Cette méthode :
   * - Construit dynamiquement un objet `where` en fonction des filtres fournis
   *   (category, factory, caliber, name, reference).
   * - Utilise `findAndCount` pour récupérer les entités correspondantes ainsi
   *   que le nombre total d'enregistrements filtrés.
   * - Charge automatiquement certaines relations (caliber, factory, category).
   * - Convertit la liste des entités en liste de DTOs via `mapEntityArrayToDtoArray`.
   * - Retourne une structure de pagination standardisée via `PaginatedResponseDto`.
   *
   *  - `category` (string) : filtre sur le nom de la catégorie
   *  - `factory` (string) : filtre sur le nom du fabricant
   *  - `caliber` (string) : filtre sur le nom du calibre
   *  - `name` (string) : filtre sur le nom de la munition
   *  - `reference` (string) : filtre sur la référence
   *  - `limit` (number, default: 10) : nombre de résultats à renvoyer
   *  - `offset` (number, default: 0) : décalage pour la pagination
   *
   * @returns {Promise<PaginatedResponseDto<AmmunitionDto>>}
   * Retourne une réponse paginée contenant :
   * - `data` : la liste des munitions au format DTO
   * - `total` : le nombre total d’enregistrements correspondant au filtre
   * - `limit` : la limite utilisée
   * - `offset` : l’offset utilisé
   *
   * @example
   * const result = await findAll({ category: 'Handgun', limit: 20 });
   * // result.data → AmmunitionDto[]
   * // result.total → nombre total filtré
   *
   * @param filters AmmunitionFilter
   */
  public async findAll(
    filters: AmmunitionFilter,
  ): Promise<PaginatedResponseDto<AmmunitionDto>> {
    const { limit = 10, offset = 0 } = filters;
    const where: FindOptionsWhere<Ammunition> = buildWhereGeneric<
      AmmunitionFilter,
      Ammunition
    >(filters, ammunitionWhereFilterConfig);

    const [entities, total] = await this.ammunitionRepository.findAndCount({
      where,
      relations: {
        caliber: true,
        factory: true,
        category: true,
        createdBy: true,
        updatedBy: true,
      },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });

    const data: AmmunitionDto[] = await this.mapEntityArrayToDtoArray(entities);

    return new PaginatedResponseDto<AmmunitionDto>(data, total, limit, offset);
  }

  /**
   * Récupère une munition par son identifiant unique.
   *
   * Cette méthode effectue plusieurs opérations :
   * 1. Recherche la munition en base avec l’ensemble de ses relations
   *    (factory, caliber, bodyType, headType, category, percussionType, createdBy, updatedBy).
   * 2. Si aucune munition n'est trouvée, lève une NotFoundException.
   * 3. Récupère le dernier prix enregistré via `priceHistoryService`.
   * 4. Récupère le dernier état de stock via `stockService`.
   * 5. Convertit l'entité en DTO enrichi incluant le prix et le stock.
   *
   * @param {number} id - Identifiant unique de la munition à récupérer.
   *
   * @returns {Promise<AmmunitionDto>} Le DTO complet représentant la munition,
   * incluant ses métadonnées, son dernier prix et son dernier mouvement de stock.
   *
   * @throws {NotFoundException} Si aucune munition n’est trouvée avec l’ID fourni.
   */
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

  public async findLastEntry(
    category: LegislationCategory,
  ): Promise<NewItemsDto | null> {
    const [entity] = await this.ammunitionRepository.find({
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
      type: 'ammunition',
      price: dto.priceHistory.currentSalePrice,
      id: dto.id,
      factory: dto.factory.name,
      sub: `Calibre: ${entity.caliber.name}, Categorie: ${dto.category.name}`,
      category: dto.category,
    };
  }

  public async findDiscountedItems(
    limit: number = 5,
  ): Promise<DiscountedItemDto[] | null> {
    const entities = await this.ammunitionRepository.find({
      where: {
        isDiscounted: true,
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
    return dtos.map((dto: AmmunitionDto) => {
      return {
        name: dto.name,
        type: 'ammunition',
        price: dto.priceHistory.currentSalePrice,
        id: dto.id,
        factory: dto.factory.name,
        isDiscounted: dto.isDiscounted,
        discountedPrice: dto.priceHistory.discountedPrice,
        precentOfDiscount: dto.priceHistory.precentOfDiscount,
        sub: `Calibre: ${dto.caliber.name}, Categorie: ${dto.category.name}, Packaging:${dto.packaging}`,
        category: dto.category,
      };
    });
  }

  /**
   * Convertit un élément de facture fournisseur en un objet `ItemInvoice`
   * prêt à être intégré dans une facture.
   *
   * Cette méthode :
   * - Récupère les informations complètes de la munition via `findById`.
   * - Calcule le total HT (prix unitaire HT × quantité).
   * - Construit un objet `ItemInvoice` enrichi des données de la munition :
   *   calibre, catégorie, fabricant, ogive, percussion, etc.
   * - Génère une description textuelle détaillée à partir des attributs de la munition.
   *
   * @param {CreateItemInvoiceSupplierDto} item - Données provenant du formulaire ou de l'entrée utilisateur :
   *   - `objectId` : identifiant de la munition.
   *   - `quantity` : quantité achetée.
   *   - `supplierPriceHT` : prix unitaire HT fourni par le fournisseur.
   *   - `status` : statut de la ligne de facture.
   *   - `id` : identifiant optionnel de l'item.
   *
   * @returns {Promise<ItemInvoice>} Un objet `ItemInvoice` complet contenant :
   *   - les informations de facturation (prix, quantité, total),
   *   - les informations de la munition (caliber, factory, category, etc.),
   *   - une description générée automatiquement.
   *
   * @throws {NotFoundException} Si l'ID de la munition (`objectId`) ne correspond à aucune entrée.
   */
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
      codeError: CodeError.AMMUNITION_OUT_OF_STOCK,
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
      createdBy: this.userService.mapEntityToDto(ammunition.createdBy),
      updatedBy: this.userService.mapEntityToDto(ammunition.updatedBy),
      createdAt: ammunition.createdAt,
      updatedAt: ammunition.updatedAt,
      isDiscounted: ammunition.isDiscounted,
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
