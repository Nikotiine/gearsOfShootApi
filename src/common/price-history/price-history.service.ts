import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from '../../database/entity/price-history.entity';
import { Repository } from 'typeorm';
import {
  CreatePriceHistoryDto,
  PriceHistoryDto,
  PriceHistoryFromEntity,
} from '../../dto/price-history.dto';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  /**
   * Insère un nouvel enregistrement d'historique de prix dans la base de données.
   *
   * @param {PriceHistoryFromEntity} priceHistoryDto - Les données à insérer, conformes à l'entité PriceHistory.
   * @returns {Promise<PriceHistoryDto>} Une promesse qui résout avec le DTO de l'enregistrement créé.
   */
  public async insert(
    priceHistoryDto: PriceHistoryFromEntity,
  ): Promise<PriceHistoryDto> {
    const entity = this.priceHistoryRepository.create({
      ...priceHistoryDto,
    });
    const created = await this.priceHistoryRepository.save(entity);
    return this.mapEntityToDto(created);
  }

  /**
   * Récupère le dernier enregistrement d'historique de prix pour un objet donné, trié par date de création décroissante.
   *
   * @param {number} objectId - L'identifiant de l'objet concerné.
   * @param {PriceableObjectType} object - Le type de l'objet concerné (par exemple : véhicule, bien immobilier, etc.).
   * @returns {Promise<PriceHistoryDto | null>} Une promesse qui résout avec le dernier enregistrement trouvé,
   * ou `null` s'il n'existe aucun historique pour cet objet.
   */
  public async findLastByObjectId(
    objectId: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto | null> {
    return await this.priceHistoryRepository.findOne({
      where: { objectId: objectId, object: object },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Génère un objet conforme à l'entité `PriceHistory` à partir d'un DTO de création et des informations sur l'objet concerné.
   *
   * @param {CreatePriceHistoryDto} dto - Le DTO contenant les informations de prix à enregistrer.
   * @param {number} objectId - L'identifiant de l'objet auquel l'historique de prix est lié.
   * @param {PriceableObjectType} object - Le type de l'objet concerné.
   * @returns {PriceHistoryFromEntity} L'objet prêt à être utilisé pour la création dans la base de données.
   */
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

  /**
   * Crée et insère un nouvel historique de prix pour un objet donné.
   *
   * @param {CreatePriceHistoryDto} dto - Les données de prix à enregistrer.
   * @param {number} id - L'identifiant de l'objet concerné.
   * @param {PriceableObjectType} object - Le type de l'objet concerné.
   * @returns {Promise<PriceHistoryDto>} Une promesse qui résout avec le DTO de l'historique de prix créé.
   */
  public async addPriceHistory(
    dto: CreatePriceHistoryDto,
    id: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto> {
    const priceHistory: PriceHistoryFromEntity =
      this.generateCreatePriceHistoryDto(dto, id, object);
    return await this.insert(priceHistory);
  }

  /**
   * Convertit une entité `PriceHistory` issue de la base de données en un objet DTO (`PriceHistoryDto`).
   *
   * Cette méthode permet d'isoler la transformation des entités en objets transférables,
   * facilitant l'encapsulation et le respect des contrats de données côté API ou services métier.
   *
   * @param {PriceHistory} entity - L'entité provenant de la base de données.
   * @returns {PriceHistoryDto} Le DTO correspondant, prêt à être retourné côté client ou couche supérieure.
   */
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
