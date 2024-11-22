import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponButtType } from '../../database/entity/weapon-butt-type.entity';
import { Repository } from 'typeorm';
import { WeaponButtTypeDto } from '../../dto/weapon.dto';

@Injectable()
export class ButtTypeService {
  constructor(
    @InjectRepository(WeaponButtType)
    private readonly buttTypeRepository: Repository<WeaponButtType>,
  ) {}

  public async findAll(): Promise<WeaponButtTypeDto[]> {
    const butts = await this.buttTypeRepository.find();
    return butts.map((butt) => {
      return {
        id: butt.id,
        name: butt.name,
      };
    });
  }
}
