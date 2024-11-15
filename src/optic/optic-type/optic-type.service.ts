import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticType } from '../../database/entity/optic-type.entity';
import { Repository } from 'typeorm';
import { CreateOpticTypeDto, OpticTypeDto } from '../../dto/optic.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

@Injectable()
export class OpticTypeService {
  constructor(
    @InjectRepository(OpticType)
    private readonly opticTypeRepository: Repository<OpticType>,
  ) {}

  public async findAll(): Promise<OpticTypeDto[]> {
    return this.opticTypeRepository.find({
      select: {
        id: true,
        name: true,
        ref: true,
      },
    });
  }

  public async insert(type: CreateOpticTypeDto): Promise<OpticTypeDto> {
    const entity = this.opticTypeRepository.create({
      name: type.name,
      ref: type.ref,
    });
    return await this.opticTypeRepository.save(entity);
  }

  public async edit(id: number, type: OpticTypeDto): Promise<OpticTypeDto> {
    const updatedResult = await this.opticTypeRepository.update(id, {
      name: type.name,
      ref: type.ref,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.OPTIC_TYPE_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticTypeRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.OPTIC_TYPE_SOFT_DELETE,
    };
  }

  private async findById(id: number): Promise<OpticTypeDto> {
    const type = await this.opticTypeRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      id: type.id,
      ref: type.ref,
      name: type.name,
    };
  }
}
