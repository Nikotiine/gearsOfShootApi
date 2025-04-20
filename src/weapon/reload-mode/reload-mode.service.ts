import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WeaponReloadMode } from '../../database/entity/weapon-reload-mode.entity';
import { WeaponReloadModeDto } from '../../dto/weapon.dto';

@Injectable()
export class ReloadModeService {
  constructor(
    @InjectRepository(WeaponReloadMode)
    private readonly reloadModeRepository: Repository<WeaponReloadMode>,
  ) {}

  public async findAll(): Promise<WeaponReloadModeDto[]> {
    const types = await this.reloadModeRepository.find();
    return types.map((type) => {
      return {
        id: type.id,
        name: type.name,
      };
    });
  }
}
