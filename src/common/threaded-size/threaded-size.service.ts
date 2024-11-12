import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadedSize } from '../../database/entity/threaded-size.entity';
import { Repository } from 'typeorm';
import {
  CreateThreadedSizeDto,
  ThreadedSizeDto,
} from '../../dto/threaded-size.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

@Injectable()
export class ThreadedSizeService {
  constructor(
    @InjectRepository(ThreadedSize)
    private readonly threadedSizeRepository: Repository<ThreadedSize>,
  ) {}

  /**
   * Retourne la liste de tous les filletage disponible
   */
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

  /**
   * Creation d'un nouveau filletage
   * @param size {CreateThreadedSizeDto}
   */
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

  /**
   * Soft delete du type de filetage
   * @param id {number} id du type de filetage
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.threadedSizeRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.THREADED_SIZE_DELETE,
    };
  }

  public async edit(
    id: number,
    size: ThreadedSizeDto,
  ): Promise<ThreadedSizeDto> {
    const updatedResult = await this.threadedSizeRepository.update(id, {
      size: size.size,
      ref: size.ref,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.THREAD_UPDATE_FAILED);
    }
    const updatedEntity = await this.findById(id);
    return this.mapEntityToDto(updatedEntity);
  }

  /**
   * Retourne l'objet {ThreadedSize} avec sa siez en paremetre
   * @param size {string} taille du filletage
   * @private
   */
  private async findBySize(size: string): Promise<ThreadedSize> {
    return this.threadedSizeRepository.findOne({
      where: {
        size: size,
      },
    });
  }

  private async findById(id: number): Promise<ThreadedSize> {
    return await this.threadedSizeRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  private mapEntityToDto(threadedSize: ThreadedSize): ThreadedSizeDto {
    return {
      id: threadedSize.id,
      ref: threadedSize.ref,
      size: threadedSize.ref,
    };
  }
}
