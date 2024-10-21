import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadedSize } from '../../database/entity/threaded-size.entity';
import { Repository } from 'typeorm';
import { ThreadedSizeDto } from '../../dto/threaded-size.dto';

@Injectable()
export class ThreadedSizeService {
  constructor(
    @InjectRepository(ThreadedSize)
    private readonly threadedSizeRepository: Repository<ThreadedSize>,
  ) {}

  public async getAll(): Promise<ThreadedSizeDto[]> {
    const sizes: ThreadedSize[] = await this.threadedSizeRepository.find({
      select: {
        id: true,
        size: true,
      },
    });
    return sizes.map((size) => {
      return {
        id: size.id,
        size: size.size,
      };
    });
  }
}
