import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caliber } from '../../database/entity/caliber.entity';

import { Repository } from 'typeorm';
import { CaliberDto } from '../../dto/caliber.dto';

@Injectable()
export class CaliberService {
  constructor(
    @InjectRepository(Caliber)
    private readonly caliberRepository: Repository<Caliber>,
  ) {}

  public async findAll(): Promise<CaliberDto[]> {
    const calibers: Caliber[] = await this.caliberRepository.find();
    return calibers.map((caliber: Caliber) => {
      return {
        name: caliber.name,
        id: caliber.id,
      };
    });
  }
}
