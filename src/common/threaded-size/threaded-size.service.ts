import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadedSize } from '../../database/entity/threaded-size.entity';
import { Repository } from 'typeorm';
import {
  CreateThreadedSizeDto,
  ThreadedSizeDto,
} from '../../dto/threaded-size.dto';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class ThreadedSizeService {
  constructor(
    @InjectRepository(ThreadedSize)
    private readonly threadedSizeRepository: Repository<ThreadedSize>,
  ) {}

  public async findAll(): Promise<ThreadedSizeDto[]> {
    const sizes: ThreadedSize[] = await this.threadedSizeRepository.find({
      select: {
        id: true,
        size: true,
        ref: true,
      },
    });
    return sizes.map((size) => {
      return {
        id: size.id,
        size: size.size,
        ref: size.ref,
      };
    });
  }

  public async insert(size: CreateThreadedSizeDto): Promise<ThreadedSizeDto> {
    const isExist = await this.findBySize(size.size);
    if (isExist) {
      throw new BadRequestException(CodeError.THREAD_SIZE_IS_USED);
    }
    const entity = this.threadedSizeRepository.create({
      size: size.size,
      ref: size.ref,
    });
    const created = await this.threadedSizeRepository.save(entity);
    return {
      id: created.id,
      size: created.size,
      ref: created.ref,
    };
  }

  private async findBySize(size: string): Promise<ThreadedSize> {
    return this.threadedSizeRepository.findOne({
      where: {
        size: size,
      },
    });
  }
}
