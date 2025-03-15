import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpticCollar } from '../../database/entity/optic-collar.entity';
import { Repository } from 'typeorm';
import {
  CreateOpticCollarDto,
  OpticCollarDto,
  UpdateOpticCollarDto,
} from '../../dto/optic-collar.dto';
import { FactoryService } from '../../common/factory/factory.service';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class OpticCollarService {
  constructor(
    @InjectRepository(OpticCollar)
    private readonly opticCollarRepository: Repository<OpticCollar>,
    private readonly factoryService: FactoryService,
  ) {}

  public async findAll(): Promise<OpticCollarDto[]> {
    const collars = await this.opticCollarRepository.find({
      relations: {
        railSize: true,
        factory: true,
      },
    });
    return this.mapOpticCollarArrayToDtoArray(collars);
  }

  public async insert(collar: CreateOpticCollarDto): Promise<OpticCollarDto> {
    const entity = this.opticCollarRepository.create({
      diameter: collar.diameter,
      name: collar.name,
      height: collar.height,
      railSize: {
        id: collar.railSizeId,
      },
      factory: {
        id: collar.factoryId,
      },
      reference: await this.createReference(collar),
      description: collar.description,
    });

    const created = await this.opticCollarRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  public async findById(id: number): Promise<OpticCollarDto> {
    const collar = await this.opticCollarRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: true,
        railSize: true,
      },
    });
    if (!collar) {
      throw new NotFoundException(CodeError.OPTIC_COLLAR_NOT_FOUND);
    }
    return this.mapEntityToDto(collar);
  }

  public async edit(
    id: number,
    collar: UpdateOpticCollarDto,
  ): Promise<OpticCollarDto> {
    const updatedResult = await this.opticCollarRepository.update(id, {
      name: collar.name,
      height: collar.height,
      description: collar.description,
      diameter: collar.diameter,
      factory: { id: collar.factoryId },
      railSize: {
        id: collar.railSizeId,
      },
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.OPTIC_COLLAR_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  private mapOpticCollarArrayToDtoArray(
    collars: OpticCollar[],
  ): OpticCollarDto[] {
    return collars.map((collar) => this.mapEntityToDto(collar));
  }

  private mapEntityToDto(collar: OpticCollar): OpticCollarDto {
    return {
      id: collar.id,
      diameter: collar.diameter,
      height: collar.height,
      railSize: collar.railSize,
      factory: collar.factory,
      description: collar.description,
      reference: collar.reference,
      name: collar.name,
    };
  }

  private async createReference(collar: CreateOpticCollarDto): Promise<string> {
    const factoryRef = await this.factoryService.findFactoryReferenceById(
      collar.factoryId,
    );
    return `${factoryRef.substring(0, 3)}-${collar.name}-${collar.diameter}-${collar.height}`;
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticCollarRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.OPTIC_COLLAR_SOFT_DELETE,
    };
  }
}
