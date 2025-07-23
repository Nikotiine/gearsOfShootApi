import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  UpdateAmmunitionDto,
} from '../dto/ammunition.dto';
import { CodeError } from '../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { PriceHistoryService } from '../common/price-history/price-history.service';
import { PriceableObjectType } from '../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../dto/price-history.dto';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  /**
   * Insertion d'une nouvelle munition en bdd
   * @param ammunition {CreateAmmunitionDto}
   */
  public async insert(ammunition: CreateAmmunitionDto): Promise<AmmunitionDto> {
    const isExist = await this.verifyIfNotExist(
      ammunition.name,
      ammunition.factory.id,
      ammunition.packaging,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_IS_EXIST);
    }
    const entity = this.ammunitionRepository.create({
      name: ammunition.name,
      description: ammunition.description,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      caliber: ammunition.caliber,
      category: ammunition.category,
      factory: ammunition.factory,
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: await this.createReference(ammunition),
    });
    const created = await this.ammunitionRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistory(
      ammunition.priceHistory,
      created.id,
      PriceableObjectType.AMMUNITION,
    );
    return this.mapEntityToDto(created, price);
  }

  /**
   * Retourne la liste des munitions filtrer par calibre
   * @param caliberId {number} id du calibre
   */
  public async findByCaliber(caliberId: number): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        caliber: {
          id: caliberId,
        },
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(ammunitions);
  }

  public async findById(id: number): Promise<AmmunitionDto> {
    const ammunition = await this.ammunitionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
      },
    });
    if (!ammunition) {
      throw new NotFoundException(CodeError.AMMUNITION_NOT_FOUND);
    }
    const price = await this.priceHistoryService.findLastByObjectId(
      ammunition.id,
      PriceableObjectType.AMMUNITION,
    );
    return this.mapEntityToDto(ammunition, price);
  }

  //TODO:Verifier si update ou preload est mieux
  public async edit(
    id: number,
    ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    const updatedResult = await this.ammunitionRepository.update(id, {
      caliber: ammunition.caliber,
      factory: ammunition.factory,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      name: ammunition.name,
      description: ammunition.description,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: await this.createReference(ammunition),
      category: ammunition.category,
      percussionType: ammunition.percussionType,
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.AMMUNITION_UPDATE_FAILED);
    }
    await this.priceHistoryService.addPriceHistory(
      ammunition.priceHistory,
      ammunition.id,
      PriceableObjectType.AMMUNITION,
    );
    return this.findById(id);
  }

  /**
   * Retourne les munition suivant leurs categorisation
   * @param category
   */
  public async findByCategory(category: number): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        category: {
          id: category,
        },
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
        bodyType: true,
        headType: true,
        category: true,
        percussionType: true,
      },
    });

    return await this.mapEntityArrayToDtoArray(ammunitions);
  }

  /**
   * Soft delete de la munition
   * @param id {number} id de la munition
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.ammunitionRepository.softDelete(id);
    if (deleted.affected > 0) {
      await this.priceHistoryService.deletePriceHistory(
        id,
        PriceableObjectType.AMMUNITION,
      );
    }
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.AMMUNITION_DELETE,
    };
  }

  /**
   * Creer la reference unique de l'arme pour a gestion des stock / recherche ect..
   * @private
   * @param ammunition {CreateAmmunitionDto}
   */
  private async createReference(
    ammunition: CreateAmmunitionDto,
  ): Promise<string> {
    return `${ammunition.factory.reference.toUpperCase()}-${ammunition.caliber.reference.toUpperCase()}-${ammunition.name.substring(0, 4).toUpperCase()}-${ammunition.headType.reference.toUpperCase()}`;
  }

  /**
   * Verifie que la munition n'existe pas deja en base de donnee
   * @param name {string} nom de la munition
   * @param factoryId {number} id de la marque
   * @param packaging {number} le packaging de la boite
   * @private
   */
  private async verifyIfNotExist(
    name: string,
    factoryId: number,
    packaging: number,
  ): Promise<boolean> {
    const ammunition = await this.ammunitionRepository.findOne({
      where: {
        name: name,
        factory: {
          id: factoryId,
        },
        packaging: packaging,
      },
    });
    return !!ammunition;
  }

  /**
   * Transforme une entité `Ammunition` en un objet `AmmunitionDto`.
   *
   * Cette méthode extrait et mappe les propriétés pertinentes de l'entité `Ammunition`
   * vers un objet conforme au DTO `AmmunitionDto`. Si des données externes sont requises
   * (comme l'historique de prix), elles sont récupérées de manière asynchrone.
   *
   * @param {Ammunition} ammunition - L'entité `Ammunition` à transformer.
   * @param price
   * @returns {Promise<AmmunitionDto>} Une promesse résolue avec le DTO correspondant.
   */
  private async mapEntityToDto(
    ammunition: Ammunition,
    price?: PriceHistoryDto,
  ): Promise<AmmunitionDto> {
    return {
      id: ammunition.id,
      name: ammunition.name,
      description: ammunition.description,
      headType: ammunition.headType,
      bodyType: ammunition.bodyType,
      caliber: ammunition.caliber,
      category: ammunition.category,
      factory: ammunition.factory,
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: ammunition.reference,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            ammunition.id,
            PriceableObjectType.AMMUNITION,
          ),
    };
  }

  /**
   * Convertit un tableau d'entités `Ammunition` en un tableau de DTOs `AmmunitionDto`.
   *
   * Cette méthode utilise la méthode `mapEntityToDto` pour transformer chaque entité
   * de type `Ammunition` en son équivalent `AmmunitionDto`. Elle exécute ces transformations
   * de manière asynchrone et attend que toutes soient terminées avant de renvoyer le résultat.
   *
   * @param {Ammunition[]} ammunitions - Le tableau d'entités `Ammunition` à transformer.
   * @returns {Promise<AmmunitionDto[]>} Une promesse résolue avec le tableau de DTOs correspondants.
   */
  private async mapEntityArrayToDtoArray(
    ammunitions: Ammunition[],
  ): Promise<AmmunitionDto[]> {
    const dtoPromises = ammunitions.map(async (ammunition) => {
      return this.mapEntityToDto(ammunition);
    });
    return await Promise.all(dtoPromises);
  }
}
