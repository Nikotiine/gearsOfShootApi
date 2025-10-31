import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceSupplier } from '../../database/entity/invoice-supplier.entity';
import { Repository } from 'typeorm';
import {
  CountInvoicesDto,
  CreateInvoiceSupplierDto,
  InvoiceSupplierDto,
  UpdateInvoiceSupplierDto,
} from '../../dto/invoice-supplier.dto';
import {
  CreateItemInvoiceSupplierDto,
  ItemInvoice,
} from '../../dto/item-invoice-supplier.dto';
import { AmmunitionService } from '../../ammunition/ammunition.service';
import { SupplierDto } from '../../dto/supplier.dto';
import { InvoiceItemService } from '../invoice-item/invoice-item.service';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { StockableObject } from '../../enum/stock-item.enum';
import { HandGunService } from '../../weapon/hand-gun/hand-gun.service';
import { RiffleService } from '../../weapon/riffle/riffle.service';
import { MagazineService } from '../../weapon/magazine/magazine.service';
import { OpticService } from '../../optic/optic.service';
import { OpticCollarService } from '../../optic/optic-collar/optic-collar.service';
import { SoundReducerService } from '../../accessory/sound-reducer/sound-reducer.service';
import { CodeError } from '../../enum/code-error.enum';
import { CodeSuccess } from '../../enum/code-success.enum';
import { InvoiceOrderStatus } from '../../types/invoice-order-status.type';

@Injectable()
export class SupplierInvoiceService {
  constructor(
    @InjectRepository(InvoiceSupplier)
    private readonly invoiceRepository: Repository<InvoiceSupplier>,
    private readonly ammunitionService: AmmunitionService,
    private readonly invoiceItemService: InvoiceItemService,
    private readonly handgunService: HandGunService,
    private readonly riffleService: RiffleService,
    private readonly magazineService: MagazineService,
    private readonly opticService: OpticService,
    private readonly opticCollarService: OpticCollarService,
    private readonly soundReducerService: SoundReducerService,
  ) {}

  /**
   * Crée une nouvelle facture fournisseur et enregistre ses articles associés.
   *
   * Cette méthode :
   * 1. Construit une entité `InvoiceSupplier` à partir du DTO reçu.
   * 2. Calcule les totaux (HT, nombre d'articles, etc.).
   * 3. Génère une référence interne unique pour la facture.
   * 4. Enregistre la facture en base.
   * 5. Insère chaque article associé via le service `InvoiceItemService`.
   * 6. Retourne la facture créée sous forme de DTO.
   *
   * @async
   * @param {CreateInvoiceSupplierDto} invoice - Données nécessaires à la création de la facture fournisseur.
   *  - `supplier`: Fournisseur associé à la facture.
   *  - `dueDate`: Date d’échéance de la facture.
   *  - `items`: Liste des articles (produits ou services) inclus dans la facture.
   *  - `comment`: Commentaire ou note optionnelle sur la facture.
   *  - `shippingCost`: Frais de port.
   *  - `vat`: Taux de TVA appliqué.
   *
   * @returns {Promise<InvoiceSupplierDto>} Une promesse résolue avec la facture créée (convertie en DTO).
   *
   * @throws {BadRequestException} Si une erreur survient lors de la création ou de la sauvegarde de la facture.
   *
   */
  public async insert(
    invoice: CreateInvoiceSupplierDto,
  ): Promise<InvoiceSupplierDto> {
    try {
      const entity: InvoiceSupplier = this.invoiceRepository.create({
        supplier: invoice.supplier,
        dueDate: new Date(invoice.dueDate),
        totalAccountHT: this.getTotalAccount(invoice.items),
        comment: invoice.comment,
        totalPriceHt: await this.getTotalPriceHt(invoice.items),
        totalInvoiceItems: this.getTotalItems(invoice.items),
        internalInvoiceReference: await this.createRefence(invoice.supplier),
        shippingCost: invoice.shippingCost,
        vat: invoice.vat,
        items: [],
      });
      const created: InvoiceSupplier =
        await this.invoiceRepository.save(entity);

      for (const item of invoice.items) {
        created.items.push(await this.invoiceItemService.insert(item, created));
      }
      return this.mapEntityToDto(created);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Récupère une facture fournisseur par son identifiant unique.
   *
   * Cette méthode interroge la base de données pour trouver une entité `InvoiceSupplier`
   * correspondant à l'`id` fourni. Elle charge également les relations nécessaires
   * (`supplier`, `items`, `createdBy`) afin de retourner une vue complète de la facture.
   *
   * Si aucune facture n’est trouvée, une exception `NotFoundException` est levée.
   *
   * @async
   * @param {number} id - Identifiant unique de la facture à rechercher.
   *
   * @returns {Promise<InvoiceSupplierDto>} Une promesse résolue avec le DTO de la facture trouvée.
   *
   * @throws {NotFoundException} Si aucune facture n’est trouvée pour l’ID donné.
   */
  public async findById(id: number): Promise<InvoiceSupplierDto> {
    const invoice: InvoiceSupplier = await this.invoiceRepository.findOne({
      where: { id: id },
      relations: {
        supplier: true,
        items: true,
        createdBy: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(CodeError.INVOICE_NOT_FOUND);
    }
    const newStatus = this.verifyInvoiceStatus(invoice.items);
    if (invoice.invoiceStatus !== newStatus) {
      invoice.invoiceStatus = newStatus;
      const updated = await this.invoiceRepository.save(invoice);
      return this.mapEntityToDto(updated);
    }
    return this.mapEntityToDto(invoice);
  }

  /**
   * Récupère la liste complète des factures fournisseurs enregistrées.
   *
   * Cette méthode interroge la base de données afin de récupérer toutes les entités
   * `InvoiceSupplier` disponibles, en chargeant également les relations utiles
   * (`supplier`, `items`, `createdBy`).
   *
   * Chaque entité récupérée est ensuite transformée en DTO via la méthode
   * `mapArrayEntityToArrayDto()` pour fournir un format cohérent et adapté à la couche API.
   *
   * @async
   * @returns {Promise<InvoiceSupplierDto[]>} Une promesse résolue avec la liste
   * de toutes les factures fournisseurs au format DTO.
   *
   */
  public async findAll(
    status?: InvoiceOrderStatus,
  ): Promise<InvoiceSupplierDto[]> {
    const query = this.invoiceRepository
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.supplier', 'supplier')
      .leftJoinAndSelect('invoice.items', 'items')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .orderBy('invoice.createdAt', 'DESC');

    if (status) {
      console.log('**********************', status);
      query.andWhere('invoice.invoiceStatus = :status', { status });
    } else {
      query.andWhere('invoice.invoiceStatus != :archived', {
        archived: 'ARCHIVE',
      });
    }

    const invoices = await query.getMany();
    // Tableau pour stocker les factures à mettre à jour
    const invoicesToUpdate: InvoiceSupplier[] = [];
    for (const invoice of invoices) {
      if (invoice.invoiceStatus !== 'ARCHIVE') {
        const newStatus = this.verifyInvoiceStatus(invoice.items);
        if (invoice.invoiceStatus !== newStatus) {
          invoice.invoiceStatus = newStatus;
          invoicesToUpdate.push(invoice);
        }
      }
    }
    // Mise à jour en batch uniquement pour les factures modifiées
    if (invoicesToUpdate.length > 0) {
      await this.invoiceRepository.save(invoicesToUpdate);
    }
    return this.mapArrayEntityToArrayDto(invoices);
  }

  /**
   * Met à jour une facture fournisseur existante ainsi que ses articles associés.
   *
   * Cette méthode :
   * 1. Charge l'entité `InvoiceSupplier` existante grâce à `preload()`, ce qui fusionne
   *    les nouvelles données avec l'entité existante.
   * 2. Met à jour les informations principales de la facture (fournisseur, montants, etc.).
   * 3. Met à jour ou ajoute les articles associés :
   *    - Si l’article possède un `id`, il est modifié via `invoiceItemService.edit()`.
   *    - Sinon, il est ajouté via `invoiceItemService.insert()`.
   * 4. Sauvegarde la facture mise à jour et renvoie un DTO prêt à être retourné par l’API.
   *
   * @async
   * @param {number} id - Identifiant unique de la facture à mettre à jour.
   * @param {UpdateInvoiceSupplierDto} invoice - Données de mise à jour de la facture fournisseur :
   *  - `supplier`: Le fournisseur associé à la facture.
   *  - `items`: Les articles à mettre à jour ou à ajouter.
   *  - Autres champs optionnels comme `dueDate`, `comment`, `shippingCost`, etc.
   *
   * @returns {Promise<InvoiceSupplierDto>} Une promesse résolue avec la facture mise à jour au format DTO.
   *
   * @throws {BadRequestException} Si une erreur survient lors du chargement ou de la sauvegarde
   * de la facture ou de ses articles.
   */
  public async update(
    id: number,
    invoice: UpdateInvoiceSupplierDto,
  ): Promise<InvoiceSupplierDto> {
    try {
      const entity: InvoiceSupplier = await this.invoiceRepository.preload({
        id: id,
        ...invoice,
        supplier: invoice.supplier,
      });
      const updated: InvoiceSupplier =
        await this.invoiceRepository.save(entity);
      for (const item of invoice.items) {
        const items: ItemInvoiceSupplier[] = [];
        if (item.id) {
          items.push(await this.invoiceItemService.edit(item));
        } else {
          items.push(await this.invoiceItemService.insert(item, updated));
        }
        updated.items = items;
      }
      return this.mapEntityToDto(updated);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async archive(id: number): Promise<InvoiceSupplierDto> {
    const invoice: InvoiceSupplier = await this.invoiceRepository.findOne({
      where: { id: id },
      relations: {
        supplier: true,
        items: true,
        createdBy: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(CodeError.INVOICE_NOT_FOUND);
    }
    if (
      invoice.invoiceStatus !== 'RECEIVED' &&
      invoice.invoiceStatus !== 'CANCELED'
    ) {
      throw new BadRequestException(CodeError.INVOICE_CANT_BE_ARCHIVE);
    }
    invoice.invoiceStatus = 'ARCHIVE';
    const updated = await this.invoiceRepository.save(invoice);
    return this.mapEntityToDto(updated);
  }

  public async countInvoiceForEachStatus(): Promise<CountInvoicesDto> {
    const result = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .select('invoice.invoiceStatus', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('invoice.invoiceStatus')
      .getRawMany();

    // 🧠 Convertir le résultat SQL en objet clé/valeur
    const counts: Record<string, number> = {
      IN_ORDER: 0,
      SHIPPING: 0,
      RECEIVED: 0,
      ARCHIVED: 0,
    };

    for (const row of result) {
      counts[row.status] = Number(row.count);
    }

    return {
      inOrder: counts.IN_ORDER,
      inShipping: counts.SHIPPING,
      received: counts.RECEIVED,
      archive: counts.ARCHIVED,
    };
  }

  /**
   * Supprime logiquement une facture fournisseur et ses articles associés.
   *
   * Cette méthode :
   * 1. Récupère la facture cible via `findById()` pour s'assurer de son existence.
   * 2. Effectue une **suppression logique** (`softDelete`) de la facture dans la base.
   *    Cela signifie que la facture n'est pas supprimée physiquement, mais marquée comme supprimée.
   * 3. Si la suppression est effective, elle appelle `invoiceItemService.deleteItemInInvoice()`
   *    pour supprimer logiquement tous les articles liés à cette facture.
   * 4. Retourne un objet de confirmation contenant l’ID supprimé, un indicateur de succès et un message.
   *
   * @async
   * @param {number} id - Identifiant unique de la facture à supprimer.
   *
   * @returns {Promise<{ id: number; isSuccess: boolean; message: string }>}
   * Une promesse résolue avec le résultat de l’opération :
   *  - `id` : Identifiant de la facture supprimée.
   *  - `isSuccess` : Indique si la suppression a bien été effectuée.
   *  - `message` : Message de succès (`CodeSuccess.INVOICE_DELETE`).
   *
   * @throws {NotFoundException} Si la facture n’existe pas (via `findById()`).
   *
   * @example
   * ```ts
   * const result = await invoiceService.delete(42);
   * console.log(result);
   * // {
   * //   id: 42,
   * //   isSuccess: true,
   * //   message: 'Facture supprimée avec succès'
   * // }
   * ```
   */
  public async delete(id: number): Promise<any> {
    const invoice = await this.findById(id);
    const deleted = await this.invoiceRepository.softDelete(id);
    if (deleted.affected > 0) {
      const itemsIds = invoice.items.map((item) => item.id);
      await this.invoiceItemService.deleteItemInInvoice(itemsIds);
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.INVOICE_DELETE,
    };
  }

  /**
   * Convertit un tableau d'entités `InvoiceSupplier` en un tableau de `InvoiceSupplierDto`.
   *
   * Cette méthode permet de transformer efficacement plusieurs entités issues de la base de données
   * en objets DTO destinés à être retournés par l’API.
   * Elle s’appuie sur la méthode interne `mapEntityToDto()` pour effectuer la conversion individuelle
   * de chaque facture, tout en utilisant `Promise.all()` pour paralléliser les opérations asynchrones.
   *
   * @private
   * @async
   * @param {InvoiceSupplier[]} invoices - Tableau d’entités `InvoiceSupplier` à convertir.
   *
   * @returns {Promise<InvoiceSupplierDto[]>}
   * Une promesse résolue avec la liste des factures converties au format DTO.
   *
   * @example
   * ```ts
   * const entities = await invoiceRepository.find({ relations: { supplier: true, items: true } });
   * const dtos = await this.mapArrayEntityToArrayDto(entities);
   * console.log(dtos[0].supplier.name); // Exemple : "Armurerie Dupont"
   * console.log(dtos.length); // Exemple : 5 factures trouvées
   * ```
   */
  private async mapArrayEntityToArrayDto(
    invoices: InvoiceSupplier[],
  ): Promise<InvoiceSupplierDto[]> {
    const dtoPromises = invoices.map(async (rds) => {
      return this.mapEntityToDto(rds);
    });
    return await Promise.all(dtoPromises);
  }

  /**
   * Transforme une entité `InvoiceSupplier` en un objet `InvoiceSupplierDto`.
   *
   * Cette méthode est utilisée pour convertir une entité issue de la base de données
   * en un objet DTO (Data Transfer Object) destiné à être retourné via l’API.
   *
   * Elle mappe toutes les propriétés principales de la facture, y compris :
   * - Les métadonnées (`id`, `createdAt`, `updatedAt`)
   * - Les relations (`supplier`, `items`, `createdBy`)
   * - Les informations financières (`totalAccountHT`, `totalPriceHt`, `vat`, etc.)
   *
   * De plus, elle appelle la méthode `mapItemsToFullItemsDto()` pour convertir
   * les articles associés en leur représentation DTO complète.
   *
   * @private
   * @async
   * @param {InvoiceSupplier} entity - L’entité `InvoiceSupplier` récupérée depuis la base de données.
   *
   * @returns {Promise<InvoiceSupplierDto>}
   * Une promesse résolue avec l’objet `InvoiceSupplierDto` correspondant à l’entité.
   */
  private async mapEntityToDto(
    entity: InvoiceSupplier,
  ): Promise<InvoiceSupplierDto> {
    return {
      id: entity.id,
      supplier: entity.supplier,
      dueDate: entity.dueDate,
      comment: entity.comment,
      internalInvoiceReference: entity.internalInvoiceReference,
      shippingCost: entity.shippingCost,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      items: await this.mapItemsToFullItemsDto(entity.items),
      createdBy: entity.createdBy,
      invoiceSupplierReference: entity.invoiceSupplierReference,
      totalAccountHT: entity.totalAccountHT,
      totalInvoiceItems: entity.totalInvoiceItems,
      totalPriceHt: entity.totalPriceHt,
      vat: entity.vat,
      invoiceStatus: entity.invoiceStatus,
    };
  }

  /**
   * Compte l'accompte total verser
   * @param items
   * @private
   */
  private getTotalAccount(items: CreateItemInvoiceSupplierDto[]): number {
    let total: number = 0;
    for (const item of items) {
      total += item.accountHT;
    }
    return total;
  }

  /**
   * Compte le prix total de la facture HT
   * @param items
   * @private
   */
  private async getTotalPriceHt(
    items: CreateItemInvoiceSupplierDto[],
  ): Promise<number> {
    let total: number = 0;
    for (const item of items) {
      total += item.quantity * item.supplierPriceHT;
    }
    return total;
  }

  /**
   * Compte le nombre total d'objet commandés
   * @param items
   * @private
   */
  private getTotalItems(items: CreateItemInvoiceSupplierDto[]): number {
    let total: number = 0;
    for (const item of items) {
      total += item.quantity;
    }
    return total;
  }

  /**
   * Compte le nombre de facture pour ce fournisseur
   * @param supplier
   * @private
   */
  private async countTotalInvoiceInCurrentMouthBySupplier(
    supplier: SupplierDto,
  ): Promise<number> {
    return await this.invoiceRepository.countBy({
      supplier: {
        id: supplier.id,
      },
    });
  }

  /**
   * Retourne la reference de la facure
   * @private
   */
  private async createRefence(supplier: SupplierDto): Promise<string> {
    const totalInvoiceFromThisSupplier =
      await this.countTotalInvoiceInCurrentMouthBySupplier(supplier);
    return `${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}/${supplier.name}/${totalInvoiceFromThisSupplier}`;
  }

  /**
   * Convertit une liste d’articles d’une facture fournisseur (`CreateItemInvoiceSupplierDto[]`)
   * en objets complets `ItemInvoice` prêts à être utilisés ou retournés dans un DTO.
   *
   * Cette méthode effectue une conversion dynamique en fonction du type d’objet stockable
   * (`StockableObject`). Pour chaque article, elle appelle le service correspondant afin
   * d’obtenir la représentation enrichie adaptée à la facture :
   *
   * - `AMMUNITION` → `ammunitionService.convertToInvoiceDto()`
   * - `HANDGUN` → `handgunService.convertToInvoiceDto()`
   * - `RIFFLE` → `riffleService.convertToInvoiceDto()`
   * - `MAGAZINE` → `magazineService.convertToInvoiceDto()`
   * - `OPTIC` → `opticService.convertToInvoiceDto()`
   * - `OPTIC_COLLAR` → `opticCollarService.convertToInvoiceDto()`
   * - `RDS` → `soundReducerService.convertToInvoiceDto()`
   *
   * Si un type d’objet non reconnu est rencontré, la méthode retourne `null`.
   *
   * @private
   * @async
   * @param {CreateItemInvoiceSupplierDto[]} items - Liste des articles de la facture à convertir.
   *
   * @returns {Promise<ItemInvoice[]>}
   * Une promesse résolue avec la liste des articles convertis au format `ItemInvoice`.
   *
   * @example
   * ```ts
   * const itemsDto: CreateItemInvoiceSupplierDto[] = [
   *   { object: StockableObject.AMMUNITION, objectId: 12, quantity: 100 },
   *   { object: StockableObject.HANDGUN, objectId: 5, quantity: 1 },
   * ];
   *
   * const fullItems = await this.mapItemsToFullItemsDto(itemsDto);
   * console.log(fullItems[0].object); // Exemple : "AMMUNITION"
   * console.log(fullItems[1].price);  // Exemple : 1200
   * ```
   */
  private async mapItemsToFullItemsDto(
    items: CreateItemInvoiceSupplierDto[],
  ): Promise<ItemInvoice[]> {
    const itemDto: ItemInvoice[] = [];
    for (const item of items) {
      switch (item.object) {
        case StockableObject.AMMUNITION:
          itemDto.push(await this.ammunitionService.convertToInvoiceDto(item));
          break;
        case StockableObject.HANDGUN:
          itemDto.push(await this.handgunService.convertToInvoiceDto(item));
          break;
        case StockableObject.RIFFLE:
          itemDto.push(await this.riffleService.convertToInvoiceDto(item));
          break;
        case StockableObject.MAGAZINE:
          itemDto.push(await this.magazineService.convertToInvoiceDto(item));
          break;
        case StockableObject.OPTIC:
          itemDto.push(await this.opticService.convertToInvoiceDto(item));
          break;
        case StockableObject.OPTIC_COLLAR:
          itemDto.push(await this.opticCollarService.convertToInvoiceDto(item));
          break;
        case StockableObject.RDS:
          itemDto.push(
            await this.soundReducerService.convertToInvoiceDto(item),
          );
          break;
        default:
          return null;
      }
    }
    return itemDto;
  }

  /**
   * private async mapItemsToFullItemsDto(
   *   items: CreateItemInvoiceSupplierDto[],
   * ): Promise<ItemInvoice[]> {
   *   const itemDto: ItemInvoice[] = [];
   *
   *   // Table de correspondance entre StockableObject et le service correspondant
   *   const serviceMap: Record<StockableObject, (item: CreateItemInvoiceSupplierDto) => Promise<ItemInvoice>> = {
   *     [StockableObject.AMMUNITION]: this.ammunitionService.convertToInvoiceDto.bind(this.ammunitionService),
   *     [StockableObject.HANDGUN]: this.handgunService.convertToInvoiceDto.bind(this.handgunService),
   *     [StockableObject.RIFFLE]: this.riffleService.convertToInvoiceDto.bind(this.riffleService),
   *     [StockableObject.MAGAZINE]: this.magazineService.convertToInvoiceDto.bind(this.magazineService),
   *     [StockableObject.OPTIC]: this.opticService.convertToInvoiceDto.bind(this.opticService),
   *     [StockableObject.OPTIC_COLLAR]: this.opticCollarService.convertToInvoiceDto.bind(this.opticCollarService),
   *     [StockableObject.RDS]: this.soundReducerService.convertToInvoiceDto.bind(this.soundReducerService),
   *   };
   *
   *   for (const item of items) {
   *     const converter = serviceMap[item.object];
   *     if (!converter) {
   *       // Si type non reconnu, on peut choisir de continuer ou de lever une exception
   *       throw new BadRequestException(`Type d'objet non pris en charge: ${item.object}`);
   *     }
   *     itemDto.push(await converter(item));
   *   }
   *
   *   return itemDto;
   * }
   */

  private verifyInvoiceStatus(
    items: ItemInvoiceSupplier[],
  ): InvoiceOrderStatus {
    if (!items || items.length === 0) {
      return 'IN_ORDER'; // par défaut si pas d'items
    }

    const hasShipping = items.some((item) => item.status === 'SHIPPING');
    const hasInOrder = items.some((item) => item.status === 'IN_ORDER');
    const hasReceived = items.some((item) => item.status === 'RECEIVED');

    // Si aucun item n'est IN_ORDER et qu'il y a au moins un SHIPPING
    if (!hasInOrder && hasShipping) {
      return 'SHIPPING';
    }

    // Si aucun item n'est IN_ORDER et qu'il y a au moins un RECEIVED et aucun SHIPPING
    if (!hasInOrder && hasReceived && !hasShipping) {
      return 'RECEIVED';
    }
    const allCanceled = items.every((item) => item.status === 'CANCELED');
    if (allCanceled) {
      return 'CANCELED';
    }

    // Dans tous les autres cas (mixte avec IN_ORDER ou autres)
    return 'IN_ORDER';
  }
}
