import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { LegislationCategoryDto } from './legislation-category.dto';

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
  @ApiProperty({
    type: LegislationCategoryDto,
  })
  @IsOptional()
  category?: LegislationCategoryDto;
}
export class DiscountedItemDto extends NewItemsDto {
  @ApiProperty()
  isDiscounted: boolean;
  @ApiProperty()
  precentOfDiscount: number;
}
