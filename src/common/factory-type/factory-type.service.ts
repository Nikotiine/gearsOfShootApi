import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FactoryType } from '../../database/entity/factory-type.entity';
import { Repository } from 'typeorm';
import { FactoryTypeDto } from '../../dto/factory.dto';

@Injectable()
export class FactoryTypeService {
  constructor(
    @InjectRepository(FactoryType)
    private readonly factoryTypeRepository: Repository<FactoryType>,
  ) {}

  public async findAll(): Promise<FactoryTypeDto[]> {
    return this.factoryTypeRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
