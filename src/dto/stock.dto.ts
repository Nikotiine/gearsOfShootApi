import { MovementType, StockableObject } from '../enum/stock-item.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateStockDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  movementType: MovementType;

  @ApiProperty()
  object: StockableObject;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  objectId: number;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  @IsString()
  reason: string;
}

export class StockHistoriesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  movementQuantity: number;

  @ApiProperty()
  previousQuantity: number;

  @ApiProperty()
  newQuantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  movement: MovementType;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  @IsString()
  reason: string;

  @ApiProperty({
    type: UserDto,
  })
  createdBy: UserDto;
}

export class StockDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @Column()
  objectId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: [StockHistoriesDto],
  })
  histories: StockHistoriesDto[];
}
