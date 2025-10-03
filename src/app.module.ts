import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './database/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { WeaponModule } from './weapon/weapon.module';
import { AmmunitionModule } from './ammunition/ammunition.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { OpticModule } from './optic/optic.module';
import { AccessoryModule } from './accessory/accessory.module';
import { SaleModule } from './sale/sale.module';
import { RequestContextService } from './request-context/request-context.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextInterceptor } from './request-context/request-context.interceptor';
import { InvoiceOrderModule } from './invoice-order/invoice-order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CommonModule,
    WeaponModule,
    AmmunitionModule,
    UserModule,
    AuthModule,
    NodemailerModule,
    OpticModule,
    AccessoryModule,
    SaleModule,
    InvoiceOrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestContextService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
