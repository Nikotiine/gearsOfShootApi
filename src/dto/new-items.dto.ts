import { ApiProperty } from '@nestjs/swagger';

export class NewItemsDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  sub?: string;
  @ApiProperty()
  factory: string;
  @ApiProperty()
  discountedPrice?: number;
}
export class DiscountedItemDto extends NewItemsDto {
  @ApiProperty()
  isDiscounted: boolean;
  @ApiProperty()
  precentOfDiscount: number;
}
