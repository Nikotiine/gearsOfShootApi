import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticType } from '../../database/entity/optic-type.entity';
import { Repository } from 'typeorm';
import { CreateOpticTypeDto, OpticTypeDto } from '../../dto/optic.dto';

@Injectable()
export class OpticTypeService {
  constructor(
    @InjectRepository(OpticType)
    private readonly opticTypeRepository: Repository<OpticType>,
  ) {}

  public async getAll(): Promise<OpticTypeDto[]> {
    return this.opticTypeRepository.find({
      select: {
        id: true,
        name: true,
        ref: true,
      },
    });
  }

  public async insert(type: CreateOpticTypeDto): Promise<OpticTypeDto> {
    const entity = this.opticTypeRepository.create({
      name: type.name,
      ref: type.ref,
    });
    return await this.opticTypeRepository.save(entity);
  }
}
