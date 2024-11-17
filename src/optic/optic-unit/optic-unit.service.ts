import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticUnit } from '../../database/entity/optic-unit.entity';
import { Repository } from 'typeorm';
import { OpticUnitDto } from '../../dto/optic.dto';

@Injectable()
export class OpticUnitService {
  constructor(
    @InjectRepository(OpticUnit)
    private readonly opticUnitRepository: Repository<OpticUnit>,
  ) {}

  public async findAll(): Promise<OpticUnitDto[]> {
    const units = await this.opticUnitRepository.find();
    return units.map((unit) => {
      return {
        label: unit.label,
        id: unit.id,
      };
    });
  }
}
