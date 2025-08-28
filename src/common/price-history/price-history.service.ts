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
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

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
  private async insert(
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
   * @returns {Promise<PriceHistoryDto>} Une promesse qui résout avec le dernier enregistrement trouvé,
   */
  public async findLastByObjectId(
    objectId: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto> {
    const price = await this.priceHistoryRepository.findOne({
      where: { objectId: objectId, object: object },
      relations: {
        createdBy: true,
        updatedBy: true,
      },
      order: { createdAt: 'DESC' },
    });
    if (!price) {
      return this.createEmptyPrice(object);
    }
    return price;
  }

  public async findAllByObjectId(
    objectId: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto[]> {
    return await this.priceHistoryRepository.find({
      where: { objectId: objectId, object: object },
      relations: {
        createdBy: true,
        updatedBy: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Ajoute un nouvel historique de prix pour un objet donné si :
   * - aucun historique n'existe encore, ou
   * - le prix fourni est différent du dernier enregistré.
   *
   * Cela permet d'éviter d'insérer des doublons de prix identiques en base.
   *
   * @param dto - Données du nouveau prix à insérer
   * @param id - Identifiant de l'objet concerné
   * @param object - Type d'objet auquel le prix est rattaché (ex: arme, accessoire, etc.)
   * @returns Le nouvel historique de prix s'il a été inséré, sinon `null`
   */
  public async addPriceHistoryIfNewOrUpdated(
    dto: CreatePriceHistoryDto,
    id: number,
    object: PriceableObjectType,
  ): Promise<PriceHistoryDto> {
    const priceHistory = await this.priceHistoryRepository.findOne({
      where: { objectId: id, object },
      relations: {
        createdBy: true,
        updatedBy: true,
      },
      order: { createdAt: 'DESC' },
    });

    const isSamePrice =
      priceHistory &&
      dto.supplierPrice === priceHistory.supplierPrice &&
      dto.currentSalePrice === priceHistory.currentSalePrice &&
      dto.recommendedSalePrice === priceHistory.recommendedSalePrice;

    if (!priceHistory || !isSamePrice) {
      return await this.addPriceHistory(dto, id, object);
    }

    return priceHistory; //
  }

  private createEmptyPrice(object: PriceableObjectType): PriceHistoryDto {
    return {
      objectId: 0,
      object: object,
      supplierPrice: 0,
      recommendedSalePrice: 0,
      createdAt: new Date(),
      currentSalePrice: 0,
      id: 0,
      createdBy: null,
      updatedBy: null,
    };
  }

  /**
   * Génère un objet conforme à l'entité `PriceHistory` à partir d'un DTO de création et des informations sur l'objet concerné.
   *
   * @param {CreatePriceHistoryDto} dto - Le DTO contenant les informations de prix à enregistrer.
   * @param {number} objectId - L'identifiant de l'objet auquel l'historique de prix est lié.
   * @param {PriceableObjectType} object - Le type de l'objet concerné.
   * @returns {PriceHistoryFromEntity} L'objet prêt à être utilisé pour la création dans la base de données.
   */
  private generateCreatePriceHistoryDto(
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

  public async deletePriceHistory(
    objectId: number,
    object: PriceableObjectType,
  ): Promise<ApiDeleteResponseDto> {
    const deleted = await this.priceHistoryRepository.softDelete({
      objectId: objectId,
      object: object,
    });
    return {
      id: 0,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.MAGAZINE_DELETE,
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
  private async addPriceHistory(
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
      updatedBy: entity.updatedBy,
      createdBy: entity.createdBy,
    };
  }
}
