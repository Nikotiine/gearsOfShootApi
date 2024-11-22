import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caliber } from '../../database/entity/caliber.entity';

import { Repository } from 'typeorm';
import { CaliberDto, CreateCaliberDto } from '../../dto/caliber.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

@Injectable()
export class CaliberService {
  constructor(
    @InjectRepository(Caliber)
    private readonly caliberRepository: Repository<Caliber>,
  ) {}

  /**
   * Retourne la liste des calibres disponible en bdd
   */
  public async findAll(): Promise<CaliberDto[]> {
    const calibers: Caliber[] = await this.caliberRepository.find();
    return calibers.map((caliber: Caliber) => {
      return {
        name: caliber.name,
        id: caliber.id,
        reference: caliber.reference,
      };
    });
  }

  /**
   * Ajout d'un nouveau calibre
   * @param caliber {CreateCaliberDto}
   */
  public async insert(caliber: CreateCaliberDto): Promise<CaliberDto> {
    const isExist = await this.findCaliberByName(caliber.name);
    if (isExist) {
      throw new BadRequestException(CodeError.CALIBER_NAME_IS_USED);
    }
    const entity = this.caliberRepository.create({
      name: caliber.name,
      reference: caliber.reference,
    });
    const created = await this.caliberRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  /**
   * Soft delete du calibre
   * @param id {number} id du calibre
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.caliberRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.CALIBER_DELETE,
    };
  }

  /**
   * Retroune le calibre en fonction de son id
   * @param id
   */
  public async findById(id: number): Promise<CaliberDto> {
    const caliber: Caliber = await this.caliberRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.mapEntityToDto(caliber);
  }

  public async edit(id: number, caliber: CaliberDto): Promise<CaliberDto> {
    const updatedResult = await this.caliberRepository.update(id, {
      name: caliber.name,
      reference: caliber.reference,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.CALIBER_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  /**
   * Retourne le calibre si il est trouve par son nom
   * @param name {string} nom du calibre
   * @private
   */
  private async findCaliberByName(name: string): Promise<Caliber> {
    return await this.caliberRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  private mapEntityToDto(caliber: Caliber): CaliberDto {
    return {
      id: caliber.id,
      reference: caliber.reference,
      name: caliber.name,
    };
  }
}
