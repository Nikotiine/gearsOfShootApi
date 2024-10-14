import { Injectable } from '@nestjs/common';
import { FactoryDto } from '../../dto/factory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../../database/entity/factory.entity';
import { FactoryType } from '../../enum/factoryTypes.enum';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

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
      };
    });
  }

  async findByType(type: FactoryType) {
    const factories = await this.factoryRepository.find({
      where: {
        factoryType: type,
      },
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
      };
    });
  }
}
