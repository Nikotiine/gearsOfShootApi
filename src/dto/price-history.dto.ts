import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PriceableObjectType } from '../enum/priceable-object-type.enum';

export class CreatePriceHistoryDto {
  @ApiProperty()
  supplierPrice: number;

  @ApiProperty()
  recommendedSalePrice: number;

  @ApiProperty()
  currentSalePrice: number;
}

export class PriceHistoryFromEntity extends CreatePriceHistoryDto {
  @ApiProperty()
  objectId: number;

  @ApiProperty()
  @IsEnum(PriceableObjectType)
  object: PriceableObjectType;
}

export class PriceHistoryDto extends PriceHistoryFromEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;
}
