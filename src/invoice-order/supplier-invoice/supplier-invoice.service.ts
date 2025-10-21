import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceSupplier } from '../../database/entity/invoice-supplier.entity';
import { Repository } from 'typeorm';
import {
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

  public async insert(invoice: CreateInvoiceSupplierDto): Promise<any> {
    try {
      const entity: InvoiceSupplier = this.invoiceRepository.create({
        supplier: invoice.supplier,
        dueDate: invoice.dueDate,
        totalAccountHT: this.getTotalAccount(invoice.items),
        comment: invoice.comment,
        totalPriceHt: await this.getTotalPriceHt(invoice.items),
        totalInvoiceItems: this.getTotalItems(invoice.items),
        internalInvoiceReference: await this.createRefence(invoice.supplier),
        shippingCost: invoice.shippingCost,
      });
      const created: InvoiceSupplier =
        await this.invoiceRepository.save(entity);
      for (const item of invoice.items) {
        created.items.push(await this.invoiceItemService.insert(item, created));
      }
      return this.mapEntityToDto(created);
    } catch (err) {
      console.log(err);
    }
  }
  public async findById(id: number): Promise<InvoiceSupplierDto> {
    const invoice: InvoiceSupplier = await this.invoiceRepository.findOne({
      where: { id: id },
      relations: {
        supplier: true,
        items: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(CodeError.INVOICE_NOT_FOUND);
    }
    return this.mapEntityToDto(invoice);
  }

  public async findAll(): Promise<InvoiceSupplierDto[]> {
    const invoices: InvoiceSupplier[] = await this.invoiceRepository.find({
      relations: {
        supplier: true,
        items: true,
      },
    });
    return this.mapArrayEntityToArrayDto(invoices);
  }

  public async update(
    id: number,
    invoice: UpdateInvoiceSupplierDto,
  ): Promise<any> {
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
      console.log(err);
    }
  }
  private async mapArrayEntityToArrayDto(
    invoices: InvoiceSupplier[],
  ): Promise<InvoiceSupplierDto[]> {
    const dtoPromises = invoices.map(async (rds) => {
      return this.mapEntityToDto(rds);
    });
    return await Promise.all(dtoPromises);
  }

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
   * Compte le nombre total d'objet commander
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
      supplier: supplier,
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
}
