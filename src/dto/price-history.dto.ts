import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PriceableObjectType } from '../enum/PriceableObjectType.enum';

export class CreatePriceHistoryDto {
  @ApiProperty()
  supplierPrice: number;

  @ApiProperty({
    nullable: true,
  })
  recommendedSalePrice: number | null;

  @ApiProperty()
  currentSalePrice: number | null;
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
