import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';
import { Repository } from 'typeorm';
import { CreateOpticDto, OpticDto, UpdateOpticDto } from '../dto/optic.dto';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { CodeError } from '../enum/code-error.enum';

@Injectable()
export class OpticService {
  constructor(
    @InjectRepository(Optic)
    private readonly opticRepository: Repository<Optic>,
  ) {}

  public async insert(optic: CreateOpticDto): Promise<OpticDto> {
    const entity = this.opticRepository.create({
      name: optic.name,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      maxZoom: optic.maxZoom,
      minElevation: optic.minElevation,
      maxElevation: optic.maxElevation,
      minZoom: optic.minZoom,
      description: optic.description,
      factory: {
        id: optic.factoryId,
      },
      valueOfOneClick: optic.valueOfOneClick,
      lensDiameter: optic.lensDiameter,
      isParallax: optic.isParallax,
      bodyDiameter: optic.bodyDiameter,
      focalPlane: optic.focalPlane,
      opticUnit: optic.opticUnit,
    });
    const created = await this.opticRepository.save(entity);
    return await this.findById(created.id);
  }

  public async findById(id: number): Promise<OpticDto> {
    const optic = await this.opticRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: {
          type: true,
        },
      },
    });
    return this.mapOpticToOpticDto(optic);
  }

  public async findAll(): Promise<OpticDto[]> {
    const optics = await this.opticRepository.find({
      relations: {
        factory: {
          type: true,
        },
      },
    });
    return this.mapOpticsArrayToOpticsDtoArray(optics);
  }

  public async edit(id: number, optic: UpdateOpticDto) {
    const updatedResult = await this.opticRepository.update(id, {
      name: optic.name,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      maxZoom: optic.maxZoom,
      minElevation: optic.minElevation,
      maxElevation: optic.maxElevation,
      minZoom: optic.minZoom,
      description: optic.description,
      factory: {
        id: optic.factoryId,
      },
      valueOfOneClick: optic.valueOfOneClick,
      lensDiameter: optic.lensDiameter,
      isParallax: optic.isParallax,
      bodyDiameter: optic.bodyDiameter,
      focalPlane: optic.focalPlane,
      opticUnit: optic.opticUnit,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.OPTIC_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticRepository.softDelete(id);
    return {
      id: id,
      message: CodeSuccess.OPTIC_SOFT_DELETE,
      isSuccess: deleted.affected > 0,
    };
  }

  private mapOpticsArrayToOpticsDtoArray(optics: Optic[]): OpticDto[] {
    const opticsDtoArray: OpticDto[] = [];
    for (const optic of optics) {
      opticsDtoArray.push(this.mapOpticToOpticDto(optic));
    }
    return opticsDtoArray;
  }

  /**
   * Transforme l objet Optic en {OpticDto}
   * @param optic {Optic}
   * @private
   */
  private mapOpticToOpticDto(optic: Optic): OpticDto {
    return {
      id: optic.id,
      name: optic.name,
      description: optic.description,
      maxZoom: optic.maxZoom,
      minZoom: optic.minZoom,
      maxElevation: optic.maxElevation,
      minElevation: optic.minElevation,
      lensDiameter: optic.lensDiameter,
      bodyDiameter: optic.bodyDiameter,
      maxParallax: optic.maxParallax,
      minParallax: optic.minParallax,
      valueOfOneClick: optic.valueOfOneClick,
      factory: optic.factory,
      opticUnit: optic.opticUnit,
      focalPlane: optic.focalPlane,
      isParallax: optic.isParallax,
    };
  }
}
