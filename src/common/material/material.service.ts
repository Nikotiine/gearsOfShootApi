import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from '../../database/entity/material.entity';
import { Repository } from 'typeorm';
import { MaterialDto } from '../../dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  public async findAll(): Promise<MaterialDto[]> {
    const materials = await this.materialRepository.find();
    return materials.map((mat) => {
      return {
        id: mat.id,
        name: mat.name,
      };
    });
  }
}
