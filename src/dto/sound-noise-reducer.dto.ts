import { ApiProperty } from '@nestjs/swagger';
import { CaliberDto } from './caliber.dto';
import { FactoryDto } from './factory.dto';
import { ThreadedSizeDto } from './threaded-size.dto';

export class CreateSoundNoiseReducerDto {
  @ApiProperty()
  caliberId: number;
  @ApiProperty()
  factoryId: number;
  @ApiProperty()
  threadedSizeId: number;
  @ApiProperty()
  diameter: number;
  @ApiProperty()
  length: number;
  @ApiProperty()
  chicane: number;
  @ApiProperty()
  estimatedNoiseReduction: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isCleanable: boolean;
}

export class UpdateSoundNoiseReducerDto extends CreateSoundNoiseReducerDto {
  @ApiProperty()
  id: number;
}

export class SoundNoiseReducerDto {
  @ApiProperty()
  id: number;
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
  @ApiProperty()
  diameter: number;
  @ApiProperty()
  length: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  reference: string;
  @ApiProperty()
  isCleanable: boolean;
  @ApiProperty()
  chicane: number;
  @ApiProperty()
  estimatedNoiseReduction: number;
}
