import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from '../../database/entity/price-history.entity';
import { Repository } from 'typeorm';
import {
  CreatePriceHistoryDto,
  PriceHistoryDto,
  PriceHistoryFromEntity,
} from '../../dto/price-history.dto';
import { PriceableObjectType } from '../../enum/PriceableObjectType.enum';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  public async insert(
    priceHistoryDto: PriceHistoryFromEntity,
  ): Promise<PriceHistoryDto> {
    const entity = this.priceHistoryRepository.create({
      ...priceHistoryDto,
    });
    const created = await this.priceHistoryRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  public async findLastByObjectId(
    objectId: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto> {
    return await this.priceHistoryRepository.findOne({
      where: { objectId: objectId, object: object },
      order: { createdAt: 'DESC' },
    });
  }

  public generateCreatePriceHistoryDto(
    dto: CreatePriceHistoryDto,
    objectId: number,
    object: PriceableObjectType,
  ): PriceHistoryFromEntity {
    return {
      currentSalePrice: dto.currentSalePrice,
      supplierPrice: dto.supplierPrice,
      recommendedSalePrice: dto.recommendedSalePrice,
      objectId: objectId,
      object: object,
    };
  }

  private mapEntityToDto(entity: PriceHistory): PriceHistoryDto {
    return {
      id: entity.id,
      supplierPrice: entity.supplierPrice,
      recommendedSalePrice: entity.recommendedSalePrice,
      currentSalePrice: entity.currentSalePrice,
      objectId: entity.objectId,
      object: entity.object,
      createdAt: entity.createdAt,
    };
  }
}
