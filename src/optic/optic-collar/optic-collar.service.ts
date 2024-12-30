import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticCollar } from '../../database/entity/optic-collar.entity';
import { Repository } from 'typeorm';
import {
  CreateOpticCollarDto,
  OpticCollarDto,
} from '../../dto/optic-collar.dto';

@Injectable()
export class OpticCollarService {
  constructor(
    @InjectRepository(OpticCollar)
    private readonly opticCollarRepository: Repository<OpticCollar>,
  ) {}

  public async findAll(): Promise<OpticCollarDto[]> {
    const collars = await this.opticCollarRepository.find({
      relations: {
        railSize: true,
        factory: true,
      },
    });
    return collars.map((collar) => {
      return {
        id: collar.id,
        diameter: collar.diameter,
        height: collar.height,
        railSize: collar.railSize,
        factory: collar.factory,
      };
    });
  }

  public async insert(collar: CreateOpticCollarDto): Promise<OpticCollarDto> {
    const entity = this.opticCollarRepository.create({
      diameter: collar.diameter,
      height: collar.height,
      railSize: {
        id: collar.railSizeId,
      },
      factory: {
        id: collar.factoryId,
      },
    });
    const created = await this.opticCollarRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  private mapEntityToDto(collar: OpticCollar): OpticCollarDto {
    return {
      id: collar.id,
      diameter: collar.diameter,
      height: collar.height,
      railSize: collar.railSize,
      factory: collar.factory,
    };
  }
}
