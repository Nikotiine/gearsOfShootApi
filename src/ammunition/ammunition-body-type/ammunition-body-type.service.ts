import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmmunitionBodyType } from '../../database/entity/ammunition-body-type.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionBodyTypeDto,
  CreateAmmunitionBodyTypeDto,
} from '../../dto/ammunition.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

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
          reference: true,
        },
      });
    return bodyTypes.map((body) => {
      return {
        id: body.id,
        name: body.name,
        reference: body.reference,
      };
    });
  }

  /**
   * Ajout d'un nouveau type de douille en bdd
   * @param body {CreateAmmunitionBodyTypeDto}
   */
  public async insert(
    body: CreateAmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    const isExist = await this.findByName(body.name);
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_BODY_TYPE_NAME_USED);
    }

    const entity = this.ammunitionBodyTypeRepository.create({
      name: body.name,
      reference: body.reference,
    });
    const created = await this.ammunitionBodyTypeRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      reference: created.reference,
    };
  }

  public async edit(
    id: number,
    body: AmmunitionBodyTypeDto,
  ): Promise<AmmunitionBodyTypeDto> {
    const updatedResult = await this.ammunitionBodyTypeRepository.update(id, {
      name: body.name,
      reference: body.reference,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(
        CodeError.AMMUNITION_BODY_TYPE_UPDATE_FAILED,
      );
    }
    return this.findById(id);
  }

  private async findById(id: number): Promise<AmmunitionBodyTypeDto> {
    const body = await this.ammunitionBodyTypeRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      id: body.id,
      reference: body.reference,
      name: body.name,
    };
  }

  /**
   * Recherche une douille par son nom
   * @param name {string} nom de la douille
   * @private
   */
  private findByName(name: string): Promise<AmmunitionBodyType> {
    return this.ammunitionBodyTypeRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  /**
   * Soft delete de l ogive
   * @param id {number} id de l ogive
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.ammunitionBodyTypeRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.BODY_TYPE_DELETE,
    };
  }
}
