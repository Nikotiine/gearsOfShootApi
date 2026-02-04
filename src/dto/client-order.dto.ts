import { ApiProperty } from '@nestjs/swagger';
import { CreateClientOrderItem } from './client-order-item.dto';

export class CreateClientOrderDTO {
  @ApiProperty()
  shippingCost: number;

  @ApiProperty()
  vat: number;

  @ApiProperty({
    type: [CreateClientOrderItem],
  })
  items: CreateClientOrderItem[];
}
