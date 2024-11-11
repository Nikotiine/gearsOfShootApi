import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoundNoiseReducer } from '../../database/entity/sound-noise-reducer.entity';
import { Repository } from 'typeorm';
import {
  CreateSoundNoiseReducerDto,
  ListOfPrerequisitesSoundNoiseReducerDto,
  SoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { FactoryService } from '../../common/factory/factory.service';
import { CaliberService } from '../../common/caliber/caliber.service';
import { ThreadedSizeService } from '../../common/threaded-size/threaded-size.service';

@Injectable()
export class SoundReducerService {
  constructor(
    @InjectRepository(SoundNoiseReducer)
    private readonly soundNoiseReducerRepository: Repository<SoundNoiseReducer>,
    private readonly factoryService: FactoryService,
    private readonly caliberService: CaliberService,
    private readonly threadedSizeService: ThreadedSizeService,
  ) {}

  /**
   * Retourne tous les reduceteur de sons
   */
  public async findAll(): Promise<SoundNoiseReducerDto[]> {
    const soundNoiseReducers = await this.soundNoiseReducerRepository.find();
    return this.mapArrayEntityToArrayDto(soundNoiseReducers);
  }

  public async insert(
    soundNoiseReducer: CreateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    const entity = this.soundNoiseReducerRepository.create({
      name: soundNoiseReducer.name,
      caliber: {
        id: soundNoiseReducer.caliberId,
      },
      factory: {
        id: soundNoiseReducer.factoryId,
      },
      threadedSize: {
        id: soundNoiseReducer.threadedSizeId,
      },
      diameter: soundNoiseReducer.diameter,
      description: soundNoiseReducer.description,
      reference: soundNoiseReducer.reference,
      isCleanable: soundNoiseReducer.isCleanable,
      length: soundNoiseReducer.length,
    });
    const created = await this.soundNoiseReducerRepository.save(entity);
    return this.findById(created.id);
  }

  public async findById(id: number): Promise<SoundNoiseReducerDto> {
    const soundNoiseReducer = await this.soundNoiseReducerRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        caliber: true,
        factory: true,
        threadedSize: true,
      },
    });
    return this.mapEntityToDto(soundNoiseReducer);
  }
  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.soundNoiseReducerRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.SOUND_REDUCER_DELETE,
    };
  }

  public async getListOfPrerequisitesSoundNoiseReducerList(): Promise<ListOfPrerequisitesSoundNoiseReducerDto> {
    const factories = await this.factoryService.findByType('rds');
    const calibers = await this.caliberService.findAll();
    const threadedSizes = await this.threadedSizeService.findAll();
    return {
      factories: factories,
      calibers: calibers,
      threadedSizes: threadedSizes,
    };
  }

  private mapArrayEntityToArrayDto(
    soundNoiseReducers: SoundNoiseReducer[],
  ): SoundNoiseReducerDto[] {
    const array: SoundNoiseReducerDto[] = [];
    for (const soundNoiseReducer of soundNoiseReducers) {
      array.push(this.mapEntityToDto(soundNoiseReducer));
    }
    return array;
  }

  private mapEntityToDto(
    soundNoiseReducer: SoundNoiseReducer,
  ): SoundNoiseReducerDto {
    return {
      id: soundNoiseReducer.id,
      factory: soundNoiseReducer.factory,
      caliber: soundNoiseReducer.caliber,
      length: soundNoiseReducer.length,
      description: soundNoiseReducer.description,
      name: soundNoiseReducer.name,
      diameter: soundNoiseReducer.diameter,
      isCleanable: soundNoiseReducer.isCleanable,
      threadedSize: soundNoiseReducer.threadedSize,
      reference: soundNoiseReducer.reference,
    };
  }
}
