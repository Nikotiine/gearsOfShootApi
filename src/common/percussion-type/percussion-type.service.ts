import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PercussionType } from '../../database/entity/percussion-type.entity';
import { Repository } from 'typeorm';
import { PercussionTypeDto } from '../../dto/percussion-type.dto';

@Injectable()
export class PercussionTypeService {
  constructor(
    @InjectRepository(PercussionType)
    private readonly percussionTypeRepository: Repository<PercussionType>,
  ) {}

  public async findAll(): Promise<PercussionTypeDto[]> {
    const types = await this.percussionTypeRepository.find();
    return types.map((type) => {
      return {
        id: type.id,
        name: type.name,
      };
    });
  }
}
