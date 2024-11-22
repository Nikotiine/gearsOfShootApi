import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticFocalPlane } from '../../database/entity/optic-focal-plane.entity';
import { Repository } from 'typeorm';
import { FocalPlaneDto } from '../../dto/optic.dto';

@Injectable()
export class OpticFocalPlaneService {
  constructor(
    @InjectRepository(OpticFocalPlane)
    private readonly opticFocalPlaneRepository: Repository<OpticFocalPlane>,
  ) {}

  public async findAll(): Promise<FocalPlaneDto[]> {
    const opticFocalPlanes = await this.opticFocalPlaneRepository.find();
    return opticFocalPlanes.map((focal) => {
      return {
        id: focal.id,
        name: focal.name,
      };
    });
  }
}
