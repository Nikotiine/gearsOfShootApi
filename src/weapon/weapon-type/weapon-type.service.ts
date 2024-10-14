import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponType } from '../../database/entity/weaponType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeaponTypeService {
  constructor(
    @InjectRepository(WeaponType)
    private readonly weaponTypeRepository: Repository<WeaponType>,
  ) {}

  public async findAll(): Promise<any> {
    const weaponTypes: WeaponType[] = await this.weaponTypeRepository.find();
  }
}
