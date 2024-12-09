import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticReadyPlate } from '../../database/entity/optic-ready-plate.entity';
import { Repository } from 'typeorm';
import { OpticReadyPlateDto } from '../../dto/optic-ready-plate.dto';

@Injectable()
export class OpticReadyPlateService {
  constructor(
    @InjectRepository(OpticReadyPlate)
    private readonly opticReadyPlateRepository: Repository<OpticReadyPlate>,
  ) {}

  public async findAll(): Promise<OpticReadyPlateDto[]> {
    const plates = await this.opticReadyPlateRepository.find();
    return plates.map((plate) => {
      return {
        id: plate.id,
        name: plate.name,
        reference: plate.reference,
        description: plate.description,
      };
    });
  }
}
