import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PriceableObjectType } from '../enum/priceable-object-type.enum';
import { UserDto } from './user.dto';
import { SupplierDto } from './supplier.dto';

export class CreatePriceHistoryDto {
  @ApiProperty()
  @IsNumber()
  supplierPrice: number;

  @ApiProperty()
  @IsNumber()
  recommendedSalePrice: number;

  @ApiProperty()
  @IsNumber()
  currentSalePrice: number;

  @ApiProperty()
  supplier: SupplierDto;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDiscounted?: boolean;

  @ApiProperty()
  @IsNumber()
  discountedPrice?: number;

  @ApiProperty()
  @IsNumber()
  precentOfDiscount?: number;
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

  @ApiProperty({
    type: UserDto,
    nullable: true,
  })
  @IsOptional()
  createdBy?: UserDto;

  @ApiProperty({
    type: UserDto,
    nullable: true,
  })
  @IsOptional()
  updatedBy?: UserDto;
}
