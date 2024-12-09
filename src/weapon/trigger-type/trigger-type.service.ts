import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TriggerType } from '../../database/entity/trigger-type.entity';
import { Repository } from 'typeorm';
import { WeaponTriggerTypeDto } from '../../dto/weapon.dto';

@Injectable()
export class TriggerTypeService {
  constructor(
    @InjectRepository(TriggerType)
    private readonly triggerTypeRepository: Repository<TriggerType>,
  ) {}

  public async findAll(): Promise<WeaponTriggerTypeDto[]> {
    const triggerTypes = await this.triggerTypeRepository.find();
    return triggerTypes.map((type) => {
      return {
        id: type.id,
        name: type.name,
        reference: type.reference,
      };
    });
  }
}
