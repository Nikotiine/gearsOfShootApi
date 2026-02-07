import { ApiProperty } from '@nestjs/swagger';
import { CreateClientOrderItem } from './client-order-item.dto';

export class CreateClientOrderDto {
  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  vat: number;

  @ApiProperty({
    type: [CreateClientOrderItem],
  })
  items: CreateClientOrderItem[];
}
export class ClientOrderDto extends CreateClientOrderDto {
  @ApiProperty()
  id: number;
}
