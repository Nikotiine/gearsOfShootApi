import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MLockOption } from '../../database/entity/m-lock-option.entity';
import { Repository } from 'typeorm';
import { MLockOptionDto } from '../../dto/m-lock-option.dto';

@Injectable()
export class MLockOptionService {
  constructor(
    @InjectRepository(MLockOption)
    private readonly mLockRepository: Repository<MLockOption>,
  ) {}

  public async findAll(): Promise<MLockOptionDto[]> {
    const options = await this.mLockRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
    return options.map((option) => {
      return {
        id: option.id,
        name: option.name,
      };
    });
  }
}
