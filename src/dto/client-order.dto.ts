import { ApiProperty } from '@nestjs/swagger';
import {
  ClientOrderItemDto,
  CreateClientOrderItemDto,
} from './client-order-item.dto';
import { IsOptional, IsString } from 'class-validator';
import { InvoiceOrderStatus } from '../types/invoice-order-status.type';
import { AddressDto } from './address.dto';

export class CreateClientOrderDto {
  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  vat: number;

  @ApiProperty({
    type: [CreateClientOrderItemDto],
  })
  items: CreateClientOrderItemDto[];

  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({
    type: AddressDto,
    nullable: true,
  })
  @IsOptional()
  shippingAddress?: AddressDto;

  @ApiProperty({
    type: AddressDto,
    nullable: true,
  })
  @IsOptional()
  paymentAddress?: AddressDto;
}

export class UpdateClientOrderDto extends CreateClientOrderDto {
  @ApiProperty()
  id: number;
}

export class ClientOrderDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  vat: number;

  @ApiProperty({
    type: [ClientOrderItemDto],
  })
  items: ClientOrderItemDto[];

  @ApiProperty()
  @IsString()
  status: InvoiceOrderStatus;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({
    type: AddressDto,
    nullable: true,
  })
  @IsOptional()
  shippingAddress?: AddressDto;

  @ApiProperty({
    type: AddressDto,
    nullable: true,
  })
  @IsOptional()
  paymentAddress?: AddressDto;
}
