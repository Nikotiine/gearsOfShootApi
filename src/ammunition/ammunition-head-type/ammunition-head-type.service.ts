import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmmunitionHeadType } from '../../database/entity/ammunition-head-type.entity';
import { Repository } from 'typeorm';
import {
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
    const entities: AmmunitionHeadType[] =
      await this.ammunitionHeadTypeRepository.find({
        select: {
          id: true,
          name: true,
          reference: true,
        },
      });
    return this.mapEntityArrayToDtoArray(entities);
  }

  public async edit(
    id: number,
    updateDto: AmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    const updatedResult = await this.ammunitionHeadTypeRepository.update(id, {
      name: updateDto.name,
      reference: this.createReference(updateDto),
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
   * @param dto CreateAmmunitionHeadTypeDto
   */
  public async insert(
    dto: CreateAmmunitionHeadTypeDto,
  ): Promise<AmmunitionHeadTypeDto> {
    const isExist = await this.ammunitionHeadTypeRepository.findOne({
      where: {
        name: dto.name,
      },
    });
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_HEAD_TYPE_NAME_USED);
    }
    const entity = this.ammunitionHeadTypeRepository.create({
      name: dto.name,
      reference: this.createReference(dto),
    });
    const created: AmmunitionHeadType =
      await this.ammunitionHeadTypeRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  /**
   * Retourne la douille en focntion de son id
   * @param headTypeId {number} id de la douille
   */
  public async findById(headTypeId: number): Promise<AmmunitionHeadTypeDto> {
    const entity: AmmunitionHeadType =
      await this.ammunitionHeadTypeRepository.findOne({
        where: {
          id: headTypeId,
        },
      });
    return this.mapEntityToDto(entity);
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

  private mapEntityToDto(entity: AmmunitionHeadType): AmmunitionHeadTypeDto {
    return {
      id: entity.id,
      name: entity.name,
      reference: entity.reference,
    };
  }

  private mapEntityArrayToDtoArray(
    entities: AmmunitionHeadType[],
  ): AmmunitionHeadTypeDto[] {
    return entities.map((entity) => this.mapEntityToDto(entity));
  }

  private createReference(dto: CreateAmmunitionHeadTypeDto): string {
    return `${dto.name.substring(0, 3).toUpperCase()}`;
  }
}
