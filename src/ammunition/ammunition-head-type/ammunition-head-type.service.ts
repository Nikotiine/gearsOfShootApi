import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmmunitionHeadType } from '../../database/entity/ammunition-head-type.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionHeadTypeDto,
  CreateAmmunitionHeadTypeDto,
} from '../../dto/ammunition.dto';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class AmmunitionHeadTypeService {
  constructor(
    @InjectRepository(AmmunitionHeadType)
    private readonly ammunitionHeadTypeRepository: Repository<AmmunitionHeadType>,
  ) {}

  /**
   * Retourne tous les types d'ogive
   */
  public async findAll(): Promise<AmmunitionHeadTypeDto[]> {
    const headTypes: AmmunitionHeadType[] =
      await this.ammunitionHeadTypeRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
    return headTypes.map((head) => {
      return {
        id: head.id,
        name: head.name,
        ref: head.ref,
      };
    });
  }

  /**
   * Ajout d'un nouveau type d'ogive
   * @param ammunitionHeadType {CreateAmmunitionHeadTypeDto}
   */
  public async insert(
    ammunitionHeadType: CreateAmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    const isExist = await this.ammunitionHeadTypeRepository.findOne({
      where: {
        name: ammunitionHeadType.name,
      },
    });
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_HEAD_TYPE_NAME_USED);
    }
    const entity = this.ammunitionHeadTypeRepository.create({
      name: ammunitionHeadType.name,
      ref: ammunitionHeadType.ref,
    });
    const created = await this.ammunitionHeadTypeRepository.save(entity);
    return { id: created.id, name: created.name, ref: created.ref };
  }

  public async findById(headTypeId: number): Promise<AmmunitionHeadTypeDto> {
    const headType = await this.ammunitionHeadTypeRepository.findOne({
      where: {
        id: headTypeId,
      },
    });
    return {
      id: headType.id,
      name: headType.name,
      ref: headType.ref,
    };
  }
}
