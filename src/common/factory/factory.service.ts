import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFactoryDto, FactoryDto } from '../../dto/factory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../../database/entity/factory.entity';
import { FactoryType } from '../../enum/factory-types.enum';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  /**
   * Retourne la liste de toutes les marque disponible
   */
  public async findAll(): Promise<FactoryDto[]> {
    const factories: Factory[] = await this.factoryRepository.find({
      select: {
        name: true,
        id: true,
        factoryType: true,
        description: true,
      },
    });

    return factories.map((factory: Factory) => {
      return {
        id: factory.id,
        name: factory.name,
        type: factory.factoryType,
        description: factory.description,
        ref: factory.ref,
      };
    });
  }

  /**
   * Filtre les marque par type / Arme / Munition / Optique ....
   * @param type {FactoryType} le type de la marque
   */
  async findByType(type: FactoryType): Promise<FactoryDto[]> {
    const factories = await this.factoryRepository.find({
      where: {
        factoryType: type,
      },
      select: {
        name: true,
        id: true,
        factoryType: true,
        description: true,
        ref: true,
      },
    });
    return factories.map((factory: Factory) => {
      return {
        id: factory.id,
        name: factory.name,
        type: factory.factoryType,
        description: factory.description,
        ref: factory.ref,
      };
    });
  }

  /**
   * Ajout d'une nouvelle marque en bdd
   * On verifie avant qu'elle existe pas deja
   * @param factory {CreateFactoryDto}
   */
  public async insert(factory: CreateFactoryDto): Promise<FactoryDto> {
    const isExist = await this.verifyIfFactoryExist(factory.name, factory.type);
    if (isExist) {
      throw new BadRequestException(CodeError.FACTORY_NAME_IS_USED);
    }
    const entity = this.factoryRepository.create({
      name: factory.name,
      description: factory.description,
      factoryType: factory.type,
      ref: factory.ref,
    });
    const created = await this.factoryRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      type: created.factoryType,
      description: created.description,
      ref: created.ref,
    };
  }

  /**
   * Verification que la marque n'existe pas
   * @param name {string} son nom
   * @param type {FactoryType} son type
   * @private
   */
  private async verifyIfFactoryExist(
    name: string,
    type: FactoryType,
  ): Promise<boolean> {
    const factory = await this.factoryRepository.findOne({
      where: {
        name: name,
        factoryType: type,
      },
    });
    return !!factory;
  }

  public async findFactoryReferenceById(id: number): Promise<string> {
    const factory = await this.factoryRepository.findOne({
      where: { id: id },
      select: {
        ref: true,
      },
    });
    return factory.ref;
  }
}
