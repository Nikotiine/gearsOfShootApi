import { ApiProperty } from '@nestjs/swagger';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { ThreadedSizeDto } from './threaded-size.dto';

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
}

export class UpdateSoundNoiseReducerDto extends CreateSoundNoiseReducerDto {
  @ApiProperty()
  id: number;
}

export class SoundNoiseReducerDto extends CreateSoundNoiseReducerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reference: string;
}
