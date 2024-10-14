import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { Repository } from 'typeorm';
import { AmmunitionDto, CreateAmmunitionDto } from '../dto/ammunition.dto';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
  ) {}

  public async insert(ammunition: CreateAmmunitionDto): Promise<AmmunitionDto> {
    const entity = this.ammunitionRepository.create({
      name: ammunition.name,
      description: ammunition.description,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      caliber: ammunition.caliber,
      category: ammunition.category,
      factory: ammunition.factory,
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
    });
    const created = await this.ammunitionRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      headType: created.headType,
      bodyType: created.bodyType,
      caliber: created.caliber,
      category: created.category,
      factory: {
        id: created.factory.id,
        type: created.factory.factoryType,
        name: created.factory.name,
        description: created.factory.description,
      },
      percussionType: created.percussionType,
      packaging: created.packaging,
      initialSpeed: created.initialSpeed,
    };
  }
}
