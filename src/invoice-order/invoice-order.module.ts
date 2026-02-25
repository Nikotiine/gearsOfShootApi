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
import { InvoiceItemController } from './invoice-item/invoice-item.controller';
import { SaleModule } from '../sale/sale.module';
import { ClientOrderService } from './client-order/client-order.service';
import { ClientOrderController } from './client-order/client-order.controller';
import { ClientOrder } from '../database/entity/client-order.entity';
import { ClientOrderItem } from '../database/entity/client-order-item.entity';
import { UserModule } from '../user/user.module';
import { ClientOrderItemService } from './client-order-item/client-order-item.service';

@Module({
  providers: [
    SupplierInvoiceService,
    InvoiceItemService,
    ClientOrderService,
    ClientOrderItemService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      InvoiceSupplier,
      ItemInvoiceSupplier,
      ClientOrder,
      ClientOrderItem,
    ]),
    AmmunitionModule,
    WeaponModule,
    OpticModule,
    AccessoryModule,
    SaleModule,
    UserModule,
  ],
  controllers: [
    SupplierInvoiceController,
    InvoiceItemController,
    ClientOrderController,
  ],
})
export class InvoiceOrderModule {}
