import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmmunitionHeadType } from '../../database/entity/ammunition-head-type.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionBodyTypeDto,
  AmmunitionHeadTypeDto,
  CreateAmmunitionHeadTypeDto,
} from '../../dto/ammunition.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

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
          reference: true,
        },
      });
    return headTypes.map((head) => {
      return {
        id: head.id,
        name: head.name,
        reference: head.reference,
      };
    });
  }

  public async edit(
    id: number,
    body: AmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    const updatedResult = await this.ammunitionHeadTypeRepository.update(id, {
      name: body.name,
      reference: body.reference,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(
        CodeError.AMMUNITION_HEAD_TYPE_UPDATE_FAILED,
      );
    }
    return this.findById(id);
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
      reference: ammunitionHeadType.reference,
    });
    const created = await this.ammunitionHeadTypeRepository.save(entity);
    return { id: created.id, name: created.name, reference: created.reference };
  }
  //TODO:Faire un mapper d'entité
  /**
   * Retourne la douille en focntion de son id
   * @param headTypeId {number} id de la douille
   */
  public async findById(headTypeId: number): Promise<AmmunitionHeadTypeDto> {
    const headType = await this.ammunitionHeadTypeRepository.findOne({
      where: {
        id: headTypeId,
      },
    });
    return {
      id: headType.id,
      name: headType.name,
      reference: headType.reference,
    };
  }

  /**
   * Soft delete de la douille
   * @param id {number} id de la douille
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.ammunitionHeadTypeRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.HEAD_TYPE_DELETE,
    };
  }
}
