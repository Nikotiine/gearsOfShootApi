import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RailSize } from '../../database/entity/rail-size.entity';
import { Repository } from 'typeorm';
import { RailSizeDto } from '../../dto/rail-size.dto';

@Injectable()
export class RailSizeService {
  constructor(
    @InjectRepository(RailSize)
    private readonly railSizeRepository: Repository<RailSize>,
  ) {}

  public async findAll(): Promise<RailSizeDto[]> {
    const rails = await this.railSizeRepository.find();
    return rails.map((rail) => {
      return {
        id: rail.id,
        name: rail.name,
        reference: rail.reference,
      };
    });
  }
}
