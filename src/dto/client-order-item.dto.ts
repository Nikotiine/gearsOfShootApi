import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { StockableObject } from '../enum/stock-item.enum';

export class CreateClientOrderItem {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  objectId: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  object: StockableObject;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
