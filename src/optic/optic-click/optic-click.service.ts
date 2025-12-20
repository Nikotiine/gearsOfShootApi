import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpticClick } from '../../database/entity/optic-click.entity';
import { OpticClickValueDto } from '../../dto/optic-click-value.dto';

@Injectable()
export class OpticClickService {
  constructor(
    @InjectRepository(OpticClick)
    private readonly opticClickRepository: Repository<OpticClick>,
  ) {}

  public async findAll(): Promise<OpticClickValueDto[]> {
    const units = await this.opticClickRepository.find({
      relations: { opticUnit: true },
    });
    return units.map((unit) => {
      return {
        name: unit.name,
        id: unit.id,
        opticUnit: unit.opticUnit,
      };
    });
  }
}
