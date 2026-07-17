import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Store } from '../database/entity/store.entity';
import { StoreDto } from '../dto/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  public async findAll(): Promise<StoreDto[]> {
    const entities = await this.storeRepository.find();
    return entities.map((store) => {
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        phone: store.phone,
        city: store.city,
        zipCode: store.zipCode,
        state: store.state,
        street: store.street,
        streetNumber: store.streetNumber,
      };
    });
  }
}
