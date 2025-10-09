import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemInvoiceSupplier } from '../../database/entity/item-invoice-supplier.entity';
import { Repository } from 'typeorm';
import { CreateItemInvoiceSupplierDto } from '../../dto/item-invoice-supplier.dto';
import { InvoiceSupplier } from '../../database/entity/invoice-supplier.entity';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(ItemInvoiceSupplier)
    private readonly itemRepository: Repository<ItemInvoiceSupplier>,
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
}
