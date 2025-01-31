import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from '../../database/entity/material.entity';
import { Repository } from 'typeorm';
import { CreateMaterialDto, MaterialDto } from '../../dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  public async findAll(): Promise<MaterialDto[]> {
    const materials = await this.materialRepository.find();
    return materials.map((material) => {
      return {
        id: material.id,
        name: material.name,
        reference: material.reference,
      };
    });
  }

  public async insert(material: CreateMaterialDto): Promise<MaterialDto> {
    const entity = this.materialRepository.create(material);
    const created = await this.materialRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      reference: created.reference,
    };
  }
}
