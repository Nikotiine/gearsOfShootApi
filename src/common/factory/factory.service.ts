import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateFactoryDto,
  EditFactoryDto,
  FactoryDto,
  ListOfPrerequisitesFactoryDto,
} from '../../dto/factory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../../database/entity/factory.entity';

import { CodeError } from '../../enum/code-error.enum';
import { FactoryTypeService } from '../factory-type/factory-type.service';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    private readonly factoryTypeService: FactoryTypeService,
  ) {}

  /**
   * Retourne la liste de toutes les marque disponible
   */
  public async findAll(): Promise<FactoryDto[]> {
    const factories: Factory[] = await this.factoryRepository.find({
      relations: {
        type: true,
      },
      select: {
        name: true,
        id: true,
        type: {
          id: true,
          name: true,
        },
        description: true,
        reference: true,
      },
    });

    return this.mapArrayEntityToArrayDto(factories);
  }

  /**
   * Filtre les marque par type / Arme / Munition / Optique ....
   * @param type {FactoryType} le type de la marque
   */
  async findByType(type: FactoryTypes): Promise<FactoryDto[]> {
    const factories = await this.factoryRepository.find({
      where: {
        type: {
          name: type,
        },
      },
      relations: {
        type: true,
      },
      select: {
        name: true,
        id: true,
        type: {
          id: true,
          name: true,
        },
        description: true,
        reference: true,
      },
    });
    return this.mapArrayEntityToArrayDto(factories);
  }

  /**
   * Ajout d'une nouvelle marque en bdd
   * On verifie avant qu'elle existe pas deja
   * @param factory {CreateFactoryDto}
   */
  public async insert(factory: CreateFactoryDto): Promise<FactoryDto> {
    const isExist = await this.verifyIfFactoryExist(
      factory.name,
      factory.typeId,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.FACTORY_NAME_IS_USED);
    }
    const entity = this.factoryRepository.create({
      name: factory.name,
      description: factory.description,
      type: {
        id: factory.typeId,
      },
      reference: factory.reference,
    });
    const created = await this.factoryRepository.save(entity);

    return this.findById(created.id);
  }

  /**
   * Verification que la marque n'existe pas
   * @param name {string} son nom
   * @param typeId {number} id du type de marque
   * @private
   */
  private async verifyIfFactoryExist(
    name: string,
    typeId: number,
  ): Promise<boolean> {
    const factory = await this.factoryRepository.findOne({
      where: {
        name: name,
        type: {
          id: typeId,
        },
      },
    });
    return !!factory;
  }

  /**
   * Retourne uniquement la reference de la maque sous forme de {string}
   * @param id {number} id de la marque
   */
  public async findFactoryReferenceById(id: number): Promise<string> {
    const factory = await this.factoryRepository.findOne({
      where: { id: id },
      select: {
        reference: true,
      },
    });
    return factory.reference;
  }

  /**
   * Retorune la liste des prerequis pour creer une nohvelle marque
   */
  public async getListOfPrerequisitesFactoryList(): Promise<ListOfPrerequisitesFactoryDto> {
    return {
      types: await this.factoryTypeService.findAll(),
    };
  }

  /**
   * Edition d'une marque
   * @param id
   * @param factory
   */
  public async edit(id: number, factory: EditFactoryDto): Promise<FactoryDto> {
    const updateResult = await this.factoryRepository.update(id, {
      id: id,
      name: factory.name,
      reference: factory.reference,
      description: factory.description,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.FACTORY_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  /**
   * Soft delete de la marque
   * @param id {number} id de la marque
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.factoryRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.FACTORY_DELETE,
    };
  }

  /**
   * Retourne FactoryDto avec son id
   * @param id {number} id de la marque
   * @private
   */
  private async findById(id: number): Promise<FactoryDto> {
    return this.factoryRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        type: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        reference: true,
        type: {
          id: true,
          name: true,
        },
      },
    });
  }

  private mapArrayEntityToArrayDto(factories: Factory[]): FactoryDto[] {
    const array: FactoryDto[] = [];
    for (const factory of factories) {
      array.push(this.mapEntityToDto(factory));
    }
    return array;
  }

  private mapEntityToDto(factory: Factory) {
    return {
      id: factory.id,
      name: factory.name,
      type: factory.type,
      description: factory.description,
      reference: factory.reference,
    };
  }
}

export type FactoryTypes =
  | 'weapon'
  | 'ammunition'
  | 'optic'
  | 'rds'
  | 'magazine';
