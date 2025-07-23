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
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';
import { PriceHistoryService } from '../../common/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';

@Injectable()
export class OpticCollarService {
  constructor(
    @InjectRepository(OpticCollar)
    private readonly opticCollarRepository: Repository<OpticCollar>,
    private readonly priceHistoryService: PriceHistoryService,
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
      factory: collar.factory,
      railSize: collar.railSize,
      reference: await this.createReference(collar),
      description: collar.description,
    });

    const created = await this.opticCollarRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistory(
      collar.priceHistory,
      created.id,
      PriceableObjectType.OPTIC_COLLAR,
    );
    return this.mapEntityToDto(created, price);
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
    const price = await this.priceHistoryService.findLastByObjectId(
      collar.id,
      PriceableObjectType.OPTIC_COLLAR,
    );
    return this.mapEntityToDto(collar, price);
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
      factory: collar.factory,
      railSize: collar.railSize,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.OPTIC_COLLAR_UPDATE_FAILED);
    }
    await this.priceHistoryService.addPriceHistory(
      collar.priceHistory,
      id,
      PriceableObjectType.OPTIC_COLLAR,
    );
    return this.findById(id);
  }

  private async mapOpticCollarArrayToDtoArray(
    collars: OpticCollar[],
  ): Promise<OpticCollarDto[]> {
    const dtoPromises = collars.map(async (collar) =>
      this.mapEntityToDto(collar),
    );
    return await Promise.all(dtoPromises);
  }

  private async mapEntityToDto(
    collar: OpticCollar,
    price?: PriceHistoryDto,
  ): Promise<OpticCollarDto> {
    return {
      id: collar.id,
      diameter: collar.diameter,
      height: collar.height,
      railSize: collar.railSize,
      factory: collar.factory,
      description: collar.description,
      reference: collar.reference,
      name: collar.name,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            collar.id,
            PriceableObjectType.OPTIC_COLLAR,
          ),
    };
  }

  private async createReference(collar: CreateOpticCollarDto): Promise<string> {
    return `${collar.factory.reference.substring(0, 3)}-${collar.name}-${collar.diameter}-${collar.height}`;
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.opticCollarRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.OPTIC_COLLAR,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.OPTIC_COLLAR_SOFT_DELETE,
    };
  }
}
