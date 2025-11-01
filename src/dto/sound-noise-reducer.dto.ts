import { ApiProperty } from '@nestjs/swagger';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { ThreadedSizeDto } from './threaded-size.dto';
import { CreatePriceHistoryDto } from './price-history.dto';
import { UserDto } from './user.dto';
import { StockDto } from './stock.dto';
import { IsOptional } from 'class-validator';

export class CreateSoundNoiseReducerDto {
  @ApiProperty({
    type: CaliberDto,
  })
  caliber: CaliberDto;

  @ApiProperty({
    type: FactoryDto,
  })
  factory: FactoryDto;

  @ApiProperty({
    type: ThreadedSizeDto,
  })
  threadedSize: ThreadedSizeDto;

  @ApiProperty({
    description: 'Diametre exterieur',
  })
  diameter: number;

  @ApiProperty({
    description: 'Longueur',
  })
  length: number;
  @ApiProperty({
    description: 'Nombre de chicane',
  })
  chicane: number;

  @ApiProperty({
    description: 'Decibel attenue selon constructeur ',
  })
  estimatedNoiseReduction: number;

  @ApiProperty({ description: 'Nom du modele' })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    description: 'Demontable pour nettoyage',
  })
  isCleanable: boolean;

  @ApiProperty({
    type: CreatePriceHistoryDto,
    description: 'Historique des prix',
  })
  priceHistory: CreatePriceHistoryDto;

  @ApiProperty()
  inStock: number;
}

export class UpdateSoundNoiseReducerDto extends CreateSoundNoiseReducerDto {
  @ApiProperty()
  id: number;
}

export class SoundNoiseReducerDto extends UpdateSoundNoiseReducerDto {
  @ApiProperty()
  reference: string;

  @ApiProperty({
    type: UserDto,
  })
  createdBy: UserDto;

  @ApiProperty({
    type: UserDto,
  })
  updatedBy: UserDto;

  @ApiProperty({
    description: 'Date de creation',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de mise a jour',
  })
  updatedAt: Date;

  @ApiProperty({
    nullable: true,
    type: StockDto,
  })
  @IsOptional()
  stock?: StockDto;
}
