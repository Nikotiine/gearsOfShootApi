import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  ListOfPrerequisitesAmmunitionDto,
  UpdateAmmunitionDto,
} from '../dto/ammunition.dto';
import { CodeError } from '../enum/code-error.enum';
import { FactoryService } from '../common/factory/factory.service';
import { CaliberService } from '../common/caliber/caliber.service';
import { AmmunitionBodyTypeService } from './ammunition-body-type/ammunition-body-type.service';
import { AmmunitionHeadTypeService } from './ammunition-head-type/ammunition-head-type.service';

import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { LegislationCategoryService } from '../common/legislation-category/legislation-category.service';
import { PercussionTypeService } from '../common/percussion-type/percussion-type.service';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
    private readonly factoryService: FactoryService,
    private readonly caliberService: CaliberService,
    private readonly ammunitionBodyTypeService: AmmunitionBodyTypeService,
    private readonly ammunitionHeadTypeService: AmmunitionHeadTypeService,
    private readonly legislationCategoryService: LegislationCategoryService,
    private readonly percussionTypeService: PercussionTypeService,
  ) {}

  /**
   * Insertion d'une nouvelle munition en bdd
   * @param ammunition {CreateAmmunitionDto}
   */
  public async insert(ammunition: CreateAmmunitionDto): Promise<AmmunitionDto> {
    const isExist = await this.verifyIfNotExist(
      ammunition.name,
      ammunition.factoryId,
      ammunition.packaging,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.AMMUNITION_IS_EXIST);
    }
    const entity = this.ammunitionRepository.create({
      name: ammunition.name,
      description: ammunition.description,
      headType: {
        id: ammunition.headTypeId,
      },
      bodyType: {
        id: ammunition.bodyTypeId,
      },
      caliber: {
        id: ammunition.caliberId,
      },
      category: {
        id: ammunition.categoryId,
      },
      factory: {
        id: ammunition.factoryId,
      },
      percussionType: {
        id: ammunition.percussionTypeId,
      },
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: await this.createReference(ammunition),
    });
    const created = await this.ammunitionRepository.save(entity);
    return this.findById(created.id);
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
    return this.mapEntityToDto(ammunition);
  }

  public async edit(
    id: number,
    ammunition: UpdateAmmunitionDto,
  ): Promise<AmmunitionDto> {
    const updatedResult = await this.ammunitionRepository.update(id, {
      caliber: {
        id: ammunition.caliberId,
      },
      factory: {
        id: ammunition.factoryId,
      },
      headType: {
        id: ammunition.headTypeId,
      },
      bodyType: {
        id: ammunition.bodyTypeId,
      },
      name: ammunition.name,
      description: ammunition.description,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: await this.createReference(ammunition),
      category: {
        id: ammunition.categoryId,
      },
      percussionType: {
        id: ammunition.percussionTypeId,
      },
    });
    if (updatedResult.affected === 0) {
      throw new BadRequestException(CodeError.AMMUNITION_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  /**
   * Retourne la liste des pre-requis necessaire a l ajout d une munition en bdd
   * Calibre / marque / type d'ogive / type d'etui
   */
  public async getListOfPrerequisitesAmmunitionDto(): Promise<ListOfPrerequisitesAmmunitionDto> {
    const calibers = await this.caliberService.findAll();
    const headTypes = await this.ammunitionHeadTypeService.findAll();
    const bodyTypes = await this.ammunitionBodyTypeService.findAll();
    const factories = await this.factoryService.findByType('ammunition');
    const categories = await this.legislationCategoryService.findAll();
    const percussionTypes = await this.percussionTypeService.findAll();
    return {
      factories: factories,
      calibers: calibers,
      headTypes: headTypes,
      bodyTypes: bodyTypes,
      categories: categories,
      percussionTypes: percussionTypes,
    };
  }

  /**
   * Retourne les munition suivant leurs categorisation
   * @param categoryId {number} id de la categorie
   */
  public async findByCategory(categoryId: number): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        category: {
          id: categoryId,
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

  /**
   * Soft delete de la munition
   * @param id {number} id de la munition
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.ammunitionRepository.softDelete(id);
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
    const factoryRef = await this.factoryService.findFactoryReferenceById(
      ammunition.factoryId,
    );
    const caliber = await this.caliberService.findById(ammunition.caliberId);
    const headType = await this.ammunitionHeadTypeService.findById(
      ammunition.headTypeId,
    );
    return `${factoryRef.toUpperCase()}-${caliber.ref.toUpperCase()}-${ammunition.name.substring(0, 4).toUpperCase()}-${headType.ref.toUpperCase()}`;
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

  private mapEntityToDto(ammunition: Ammunition): AmmunitionDto {
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
    };
  }

  private mapEntityArrayToDtoArray(ammunitions: Ammunition[]): AmmunitionDto[] {
    return ammunitions.map((ammunition) => {
      return {
        id: ammunition.id,
        name: ammunition.name,
        description: ammunition.description,
        headType: ammunition.headType,
        bodyType: ammunition.bodyType,
        caliber: ammunition.caliber,
        category: ammunition.category,
        factory: {
          id: ammunition.factory.id,
          type: ammunition.factory.type,
          name: ammunition.factory.name,
          description: ammunition.factory.description,
          ref: ammunition.factory.ref,
        },
        percussionType: ammunition.percussionType,
        packaging: ammunition.packaging,
        initialSpeed: ammunition.initialSpeed,
        reference: ammunition.reference,
      };
    });
  }
}
