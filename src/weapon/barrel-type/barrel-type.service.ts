import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponBarrelType } from '../../database/entity/weapon-barrel-type.entity';
import { Repository } from 'typeorm';
import { WeaponBarrelTypeDto } from '../../dto/weapon.dto';

@Injectable()
export class BarrelTypeService {
  constructor(
    @InjectRepository(WeaponBarrelType)
    private readonly barrelTypeRepository: Repository<WeaponBarrelType>,
  ) {}

  public async findAll(): Promise<WeaponBarrelTypeDto[]> {
    const types = await this.barrelTypeRepository.find();
    return types.map((type) => {
      return {
        id: type.id,
        name: type.name,
      };
    });
  }
}
