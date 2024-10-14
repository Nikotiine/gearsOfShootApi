import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponType } from '../../database/entity/weaponType.entity';
import { Repository } from 'typeorm';
import { WeaponTypeDto } from '../../dto/weaponType.dto';

@Injectable()
export class WeaponTypeService {
  constructor(
    @InjectRepository(WeaponType)
    private readonly weaponTypeRepository: Repository<WeaponType>,
  ) {}

  public async findAll(): Promise<WeaponTypeDto[]> {
    const weaponTypes: WeaponType[] = await this.weaponTypeRepository.find();
    return weaponTypes.map((type) => {
      return {
        id: type.id,
        name: type.name,
      };
    });
  }
}
