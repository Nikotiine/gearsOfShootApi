import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { In, Repository } from 'typeorm';
import {
  CreateItemInvoiceSupplierDto,
  UpdateBulkItemStatusDto,
  UpdateItemStatusDto,
} from '../../dto/item-invoice-supplier.dto';
import { InvoiceSupplier } from '../../database/entity/invoice-supplier.entity';
import { StockService } from '../../sale/stock/stock.service';
import { CreateStockDto } from '../../dto/stock.dto';
import { MovementType } from '../../enum/stock-item.enum';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(ItemInvoiceSupplier)
    private readonly itemRepository: Repository<ItemInvoiceSupplier>,
    private readonly stockService: StockService,
  ) {}

  /**
   * Crée et enregistre un nouvel article dans une facture fournisseur.
   *
   * Cette méthode :
   * 1. Crée une entité `ItemInvoiceSupplier` à partir du DTO fourni et de la facture associée.
   * 2. Calcule automatiquement le `totalPriceHT` en multipliant `supplierPriceHT` par `quantity`.
   * 3. Enregistre l'article en base de données via le repository TypeORM.
   *
   * @async
   * @param {CreateItemInvoiceSupplierDto} item - Données de l'article à ajouter :
   *  - `object`: Type d'objet stockable (ex: AMMUNITION, HANDGUN, etc.).
   *  - `objectId`: Identifiant de l'objet stockable.
   *  - `status`: Statut de l'article.
   *  - `accountHT`: Montant HT associé.
   *  - `quantity`: Quantité de l'article.
   *  - `comment`: Commentaire optionnel.
   *  - `supplierPriceHT`: Prix fournisseur HT unitaire.
   *  - `description`: Description de l'article.
   * @param {InvoiceSupplier} invoice - Facture fournisseur à laquelle l'article est associé.
   *
   * @returns {Promise<ItemInvoiceSupplier>}
   * Une promesse résolue avec l'article enregistré en base (`ItemInvoiceSupplier`).
   *
   * @example
   * ```ts
   * const newItem: CreateItemInvoiceSupplierDto = {
   *   object: StockableObject.HANDGUN,
   *   objectId: 5,
   *   status: 'PENDING',
   *   accountHT: 1200,
   *   quantity: 2,
   *   comment: 'Livraison partielle',
   *   supplierPriceHT: 600,
   *   description: 'Pistolet modèle X',
   * };
   * const savedItem = await invoiceItemService.insert(newItem, invoiceEntity);
   * console.log(savedItem.totalPriceHT); // 1200
   * ```
   */
  public async insert(
    item: CreateItemInvoiceSupplierDto,
    invoice: InvoiceSupplier,
  ): Promise<ItemInvoiceSupplier> {
    const entity: ItemInvoiceSupplier = this.itemRepository.create({
      object: item.object,
      objectId: item.objectId,
      status: item.status,
      accountHT: item.accountHT,
      quantity: item.quantity,
      comment: item.comment,
      supplierPriceHT: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
      invoice: invoice,
      internalInvoiceReference: invoice.internalInvoiceReference,
      description: item.description,
    });
    return await this.itemRepository.save(entity);
  }

  /**
   * Met à jour un article existant dans une facture fournisseur.
   *
   * Cette méthode :
   * 1. Charge l'entité existante `ItemInvoiceSupplier` via `preload()` pour fusionner
   *    les nouvelles données avec l'entité en base.
   * 2. Recalcule automatiquement le `totalPriceHT` en multipliant `supplierPriceHT` par `quantity`.
   * 3. Sauvegarde l'article mis à jour dans la base de données.
   *
   * @async
   * @param {CreateItemInvoiceSupplierDto} item - Données de mise à jour de l'article :
   *  - `id`: Identifiant de l'article à modifier.
   *  - `object`: Type d'objet stockable (ex: AMMUNITION, HANDGUN, etc.).
   *  - `objectId`: Identifiant de l'objet stockable.
   *  - `status`: Statut de l'article.
   *  - `accountHT`: Montant HT associé.
   *  - `quantity`: Quantité de l'article.
   *  - `comment`: Commentaire optionnel.
   *  - `supplierPriceHT`: Prix fournisseur HT unitaire.
   *
   * @returns {Promise<ItemInvoiceSupplier>}
   * Une promesse résolue avec l'article mis à jour en base (`ItemInvoiceSupplier`).
   *
   * @example
   * ```ts
   * const updatedItem: CreateItemInvoiceSupplierDto = {
   *   id: 12,
   *   object: StockableObject.HANDGUN,
   *   objectId: 5,
   *   status: 'RECEIVED',
   *   accountHT: 1200,
   *   quantity: 2,
   *   comment: 'Livraison complète',
   *   supplierPriceHT: 600,
   * };
   * const savedItem = await invoiceItemService.edit(updatedItem);
   * console.log(savedItem.totalPriceHT); // 1200
   * ```
   */
  public async edit(
    item: CreateItemInvoiceSupplierDto,
  ): Promise<ItemInvoiceSupplier> {
    const update: ItemInvoiceSupplier = await this.itemRepository.preload({
      id: item.id,
      object: item.object,
      objectId: item.objectId,
      status: item.status,
      accountHT: item.accountHT,
      quantity: item.quantity,
      comment: item.comment,
      supplierPriceHT: item.supplierPriceHT,
      totalPriceHT: item.supplierPriceHT * item.quantity,
    });
    return await this.itemRepository.save(update);
  }

  /**
   * Met à jour le statut d'un article d'une facture fournisseur et ajuste le stock si nécessaire.
   *
   * Cette méthode :
   * 1. Récupère l'article correspondant à l'`id` fourni.
   * 2. Si le nouvel état n'est pas `CANCELED` et que l'état actuel est `RECEIVED`,
   *    elle effectue une sortie de stock via `updateStock('OUT', entity)`.
   * 3. Met à jour le champ `status` de l'article.
   * 4. Sauvegarde l'article modifié dans la base.
   * 5. Si le nouvel état est `RECEIVED`, elle effectue une entrée en stock via `updateStock('IN', saved)`.
   *
   * @async
   * @param {number} id - Identifiant unique de l'article à mettre à jour.
   * @param {UpdateItemStatusDto} status - DTO contenant le nouveau statut :
   *  - `status`: Nouveau statut de l'article (ex: 'PENDING', 'RECEIVED', 'CANCELED').
   *
   * @returns {Promise<ItemInvoiceSupplier>}
   * Une promesse résolue avec l'article mis à jour en base (`ItemInvoiceSupplier`).
   *
   * @throws {NotFoundException} Si l'article avec l'`id` fourni n'existe pas.
   *
   * @example
   * ```ts
   * const statusUpdate: UpdateItemStatusDto = { status: 'RECEIVED' };
   * const updatedItem = await invoiceItemService.updateStatus(12, statusUpdate);
   * console.log(updatedItem.status); // 'RECEIVED'
   * ```
   */
  public async updateStatus(
    id: number,
    status: UpdateItemStatusDto,
  ): Promise<ItemInvoiceSupplier> {
    const entity = await this.itemRepository.findOne({
      where: { id: id },
    });
    if (status.status !== 'CANCELED' && entity.status === 'RECEIVED') {
      await this.updateStock('OUT', entity);
    }
    entity.status = status.status;
    const saved = await this.itemRepository.save(entity);
    if (saved.status === 'RECEIVED') {
      await this.updateStock('IN', saved);
    }
    return saved;
  }

  /**
   * Met à jour le statut de plusieurs items en une seule opération.
   *
   * - Si un item passe de "RECEIVED" vers un autre statut, on décrémente le stock.
   * - Si un item passe vers "RECEIVED", on incrémente le stock.
   *
   * @param body
   * @returns {Promise<ItemInvoiceSupplier[]>} Les entités mises à jour.
   */
  public async updateStatuses(
    body: UpdateBulkItemStatusDto,
  ): Promise<ItemInvoiceSupplier[]> {
    const ids = body.ids;
    const status = body.status;
    // Récupérer tous les items à mettre à jour
    const items = await this.itemRepository.findBy({
      id: In(ids),
    });

    if (!items.length) {
      throw new BadRequestException('Aucun item trouvé pour les IDs fournis.');
    }

    const updatedItems: ItemInvoiceSupplier[] = [];

    for (const item of items) {
      // Si on annule un item reçu → on retire du stock
      if (status !== 'CANCELED' && item.status === 'RECEIVED') {
        await this.updateStock('OUT', item);
      }

      // Mise à jour du statut
      item.status = status;

      const saved = await this.itemRepository.save(item);

      // Si l’item devient "RECEIVED" → on ajoute au stock
      if (saved.status === 'RECEIVED') {
        await this.updateStock('IN', saved);
      }

      updatedItems.push(saved);
    }

    return updatedItems;
  }

  /**
   * Supprime logiquement plusieurs articles d'une facture fournisseur.
   *
   * Cette méthode effectue une **suppression logique** (soft delete) pour tous les articles
   * dont les identifiants sont fournis. Les articles ne sont pas supprimés physiquement de la base,
   * mais marqués comme supprimés.
   *
   * @async
   * @param {number[]} ids - Tableau des identifiants des articles à supprimer.
   *
   * @returns {Promise<void>}
   * Une promesse résolue lorsque tous les articles ont été marqués comme supprimés.
   *
   * @throws {InternalServerErrorException} Si une erreur survient lors de la suppression.
   */
  public async deleteItemInInvoice(ids: number[]): Promise<any> {
    try {
      await this.itemRepository.softDelete(ids);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * Met à jour le stock d'un objet en fonction du type de mouvement lié à un article de facture.
   *
   * Cette méthode crée un mouvement de stock (`IN` ou `OUT`) en fonction du statut de l'article
   * et appelle le service `stockService.insert()` pour enregistrer l'opération.
   *
   * @private
   * @async
   * @param {MovementType} movementType - Type de mouvement de stock :
   *  - `'IN'` : entrée en stock (ex: commande reçue).
   *  - `'OUT'` : sortie de stock (ex: annulation de commande ou correction).
   * @param {ItemInvoiceSupplier} item - Article de la facture pour lequel le stock est mis à jour.
   *  Contient notamment `object`, `objectId` et `quantity`.
   *
   * @returns {Promise<void>}
   * Une promesse résolue lorsque le mouvement de stock a été enregistré.
   */
  private async updateStock(
    movementType: MovementType,
    item: ItemInvoiceSupplier,
  ): Promise<void> {
    const reason =
      movementType === 'IN'
        ? 'Mise en stock suite a commande recue'
        : 'Annulation de la commande ou erreur de saisie';
    const newStock: CreateStockDto = {
      object: item.object,
      objectId: item.objectId,
      quantity: item.quantity,
      movementType: movementType,
      reason: reason,
    };
    await this.stockService.insert(newStock);
  }
}
