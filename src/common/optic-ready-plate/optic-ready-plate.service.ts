import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticReadyPlate } from '../../database/entity/optic-ready-plate.entity';
import { Repository } from 'typeorm';
import {
  CreateOpticReadyPlateDto,
  OpticReadyPlateDto,
} from '../../dto/optic-ready-plate.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

@Injectable()
export class OpticReadyPlateService {
  constructor(
    @InjectRepository(OpticReadyPlate)
    private readonly opticReadyPlateRepository: Repository<OpticReadyPlate>,
  ) {}

  public async findAll(): Promise<OpticReadyPlateDto[]> {
    const plates = await this.opticReadyPlateRepository.find();
    return plates.map((plate) => {
      return {
        id: plate.id,
        name: plate.name,
        reference: plate.reference,
        description: plate.description,
      };
    });
  }

  public async findById(id: number): Promise<OpticReadyPlateDto> {
    const plate = await this.opticReadyPlateRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      id: plate.id,
      name: plate.name,
      reference: plate.reference,
      description: plate.description,
    };
  }

  public async insert(
    plate: CreateOpticReadyPlateDto,
  ): Promise<OpticReadyPlateDto> {
    const entity = this.opticReadyPlateRepository.create({
      name: plate.name,
      description: plate.description,
      reference: plate.reference,
    });
    const created = await this.opticReadyPlateRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      reference: created.reference,
      description: created.description,
    };
  }

  public async edit(id: number, updated: OpticReadyPlateDto) {
    const updateResult = await this.opticReadyPlateRepository.update(id, {
      id: id,
      name: updated.name,
      reference: updated.reference,
      description: updated.description,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.OPTIC_READY_PLATE_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  /**
   * Soft delete de la marque
   * @param id {number} id de la marque
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticReadyPlateRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.OPTIC_READY_PLATE_DELETE,
    };
  }
}
