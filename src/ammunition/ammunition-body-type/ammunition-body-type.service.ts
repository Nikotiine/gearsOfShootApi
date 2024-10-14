import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmmunitionBodyType } from '../../database/entity/ammunition-body-type.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionBodyTypeDto,
  CreateAmmunitionBodyTypeDto,
} from '../../dto/ammunition.dto';

@Injectable()
export class AmmunitionBodyTypeService {
  constructor(
    @InjectRepository(AmmunitionBodyType)
    private readonly ammunitionBodyTypeRepository: Repository<AmmunitionBodyType>,
  ) {}

  /**
   * Retourne la liste de tous les type de douilles
   */
  public async findAll(): Promise<AmmunitionBodyTypeDto[]> {
    const bodyTypes: AmmunitionBodyType[] =
      await this.ammunitionBodyTypeRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
    return bodyTypes.map((body) => {
      return {
        id: body.id,
        name: body.name,
      };
    });
  }

  public async insert(
    body: CreateAmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    const isExist = await this.findByName(body.name);
    if (isExist) {
      throw new BadRequestException();
    }

    const entity = this.ammunitionBodyTypeRepository.create({
      name: body.name,
    });
    const created = await this.ammunitionBodyTypeRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
    };
  }

  private findByName(name: string): Promise<AmmunitionBodyType> {
    return this.ammunitionBodyTypeRepository.findOne({
      where: {
        name: name,
      },
    });
  }
}
