import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoundNoiseReducer } from '../../database/entity/sound-noise-reducer.entity';
import { Repository } from 'typeorm';
import {
  CreateSoundNoiseReducerDto,
  SoundNoiseReducerDto,
  UpdateSoundNoiseReducerDto,
} from '../../dto/sound-noise-reducer.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class SoundReducerService {
  constructor(
    @InjectRepository(SoundNoiseReducer)
    private readonly soundNoiseReducerRepository: Repository<SoundNoiseReducer>,
  ) {}

  /**
   * Retourne tous les reduceteur de sons
   */
  public async findAll(): Promise<SoundNoiseReducerDto[]> {
    const soundNoiseReducers = await this.soundNoiseReducerRepository.find({
      relations: {
        caliber: true,
        threadedSize: true,
        factory: true,
      },
    });
    return this.mapArrayEntityToArrayDto(soundNoiseReducers);
  }

  public async insert(
    soundNoiseReducer: CreateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const entity = this.soundNoiseReducerRepository.create({
      name: soundNoiseReducer.name,
      caliber: soundNoiseReducer.caliber,
      factory: soundNoiseReducer.factory,
      threadedSize: soundNoiseReducer.threadedSize,
      diameter: soundNoiseReducer.diameter,
      description: soundNoiseReducer.description,
      reference: await this.createReference(soundNoiseReducer),
      isCleanable: soundNoiseReducer.isCleanable,
      length: soundNoiseReducer.length,
      chicane: soundNoiseReducer.chicane,
      estimatedNoiseReduction: soundNoiseReducer.estimatedNoiseReduction,
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

  public async edit(
    id: number,
    soundNoiseReducer: UpdateSoundNoiseReducerDto,
  ): Promise<SoundNoiseReducerDto> {
    await this.ensureSoundNoiseReducerDoesNotExist(soundNoiseReducer);
    const updateResult = await this.soundNoiseReducerRepository.update(id, {
      name: soundNoiseReducer.name,
      length: soundNoiseReducer.length,
      factory: soundNoiseReducer.factory,
      threadedSize: soundNoiseReducer.threadedSize,
      caliber: soundNoiseReducer.caliber,
      description: soundNoiseReducer.description,
      reference: await this.createReference(soundNoiseReducer),
      isCleanable: soundNoiseReducer.isCleanable,
      diameter: soundNoiseReducer.diameter,
      chicane: soundNoiseReducer.chicane,
      estimatedNoiseReduction: soundNoiseReducer.estimatedNoiseReduction,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(
        CodeError.SOUND_NOISE_REDUCER_UPDATE_FAILED,
      );
    }
    return await this.findById(id);
  }

  private mapArrayEntityToArrayDto(
    soundNoiseReducers: SoundNoiseReducer[],
  ): SoundNoiseReducerDto[] {
    return soundNoiseReducers.map(this.mapEntityToDto.bind(this));
  }

  /**
   * Mappe une entité `SoundNoiseReducer` vers un objet DTO `SoundNoiseReducerDto`.
   *
   * Cette méthode est utilisée pour transformer une entité de base de données ou métier
   * en un Data Transfer Object (DTO)
   * @private
   * @param {SoundNoiseReducer} soundNoiseReducer - L'entité représentant un réducteur de son.
   * @returns {SoundNoiseReducerDto} L'objet DTO contenant les données du réducteur de son.
   */
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
      chicane: soundNoiseReducer.chicane,
      estimatedNoiseReduction: soundNoiseReducer.estimatedNoiseReduction,
    };
  }

  /**
   * Génère une référence unique pour un réducteur de son à partir des données fournies.
   *
   * Cette méthode construit une chaîne de référence en combinant le nom du réducteur,
   * une partie de la référence de la fabrique, la référence du calibre et celle du filetage.
   * Elle interroge les services associés pour récupérer les valeurs nécessaires.
   *
   * Format retourné : `<name>-<factoryRef[0..2]>-<caliberRef>/<threadSizeRef>`
   * Exemple : `SilentMax-FAC-9MM/M13x1`
   *
   * @private
   * @async
   * @param {CreateSoundNoiseReducerDto} rds - Données nécessaires à la création du réducteur de son.
   * @returns {Promise<string>} Une promesse résolue avec la référence générée.
   */
  private async createReference(
    rds: CreateSoundNoiseReducerDto,
  ): Promise<string> {
    return `${rds.name}-${rds.factory.reference.substring(0, 3)}-${rds.caliber.reference}/${rds.threadedSize.reference}`;
  }

  /**
   * Vérifie si un réducteur de son avec les mêmes propriétés existe déjà.
   *
   * @private
   * @param {CreateSoundNoiseReducerDto} rds - Données du réducteur à vérifier.
   * @throws {BadRequestException} Si un réducteur avec le même nom, fabrique et filetage existe.
   */
  private async ensureSoundNoiseReducerDoesNotExist(
    rds: CreateSoundNoiseReducerDto,
  ): Promise<void> {
    const isExist = await this.soundNoiseReducerRepository.findOne({
      where: {
        name: rds.name,
        factory: rds.factory,
        threadedSize: rds.threadedSize,
      },
    });

    if (isExist) {
      throw new BadRequestException(CodeError.SOUND_NOISE_EXIST);
    }
  }
}
