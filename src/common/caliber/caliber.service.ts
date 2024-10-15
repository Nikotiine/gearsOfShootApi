import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caliber } from '../../database/entity/caliber.entity';

import { Repository } from 'typeorm';
import { CaliberDto, CreateCaliberDto } from '../../dto/caliber.dto';
import { CodeError } from '../../enum/code-error.enum';

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
    });
    const created = await this.caliberRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
    };
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
}
