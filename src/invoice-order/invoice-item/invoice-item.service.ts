import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { Repository } from 'typeorm';
import {
  CreateItemInvoiceSupplierDto,
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
