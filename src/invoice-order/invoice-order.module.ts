import { Module } from '@nestjs/common';
import { SupplierInvoiceService } from './supplier-invoice/supplier-invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceSupplier } from '../database/entity/invoice-supplier.entity';
import { ItemInvoiceSupplier } from '../database/entity/item-invoice-supplier.entity';
import { SupplierInvoiceController } from './supplier-invoice/supplier-invoice.controller';
import { AmmunitionModule } from '../ammunition/ammunition.module';
import { InvoiceItemService } from './invoice-item/invoice-item.service';
import { WeaponModule } from '../weapon/weapon.module';
import { OpticModule } from '../optic/optic.module';
import { AccessoryModule } from '../accessory/accessory.module';

@Module({
  providers: [SupplierInvoiceService, InvoiceItemService],
  imports: [
    TypeOrmModule.forFeature([InvoiceSupplier, ItemInvoiceSupplier]),
    AmmunitionModule,
    WeaponModule,
    OpticModule,
    AccessoryModule,
  ],
  controllers: [SupplierInvoiceController],
})
export class InvoiceOrderModule {}
