import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ammunition } from '../database/entity/ammunition.entity';
import { Repository } from 'typeorm';
import {
  AmmunitionDto,
  CreateAmmunitionDto,
  ListOfPrerequisitesAmmunitionDto,
} from '../dto/ammunition.dto';
import { CodeError } from '../enum/code-error.enum';
import { FactoryService } from '../common/factory/factory.service';
import { CaliberService } from '../common/caliber/caliber.service';
import { AmmunitionBodyTypeService } from './ammunition-body-type/ammunition-body-type.service';
import { AmmunitionHeadTypeService } from './ammunition-head-type/ammunition-head-type.service';
import { LegislationCategories } from '../enum/legislation-categories.enum';

@Injectable()
export class AmmunitionService {
  constructor(
    @InjectRepository(Ammunition)
    private readonly ammunitionRepository: Repository<Ammunition>,
    private readonly factoryService: FactoryService,
    private readonly caliberService: CaliberService,
    private readonly ammunitionBodyTypeService: AmmunitionBodyTypeService,
    private readonly ammunitionHeadTypeService: AmmunitionHeadTypeService,
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
      category: ammunition.category,
      factory: {
        id: ammunition.factoryId,
      },
      percussionType: ammunition.percussionType,
      packaging: ammunition.packaging,
      initialSpeed: ammunition.initialSpeed,
      reference: await this.createReference(ammunition),
    });
    const created = await this.ammunitionRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      headType: created.headType,
      bodyType: created.bodyType,
      caliber: created.caliber,
      category: created.category,
      factory: {
        id: created.factory.id,
        type: created.factory.type,
        name: created.factory.name,
        description: created.factory.description,
        ref: created.factory.ref,
      },
      percussionType: created.percussionType,
      packaging: created.packaging,
      initialSpeed: created.initialSpeed,
      reference: created.reference,
    };
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
        factory: true,
        caliber: true,
      },
    });
    return this.mapEntityArrayToDtoArray(ammunitions);
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
    return {
      factories: factories,
      calibers: calibers,
      headTypes: headTypes,
      bodyTypes: bodyTypes,
    };
  }

  /**
   * Retourne les munition suivant leurs categorisation
   * @param category
   */
  public async findByCategory(
    category: LegislationCategories,
  ): Promise<AmmunitionDto[]> {
    const ammunitions: Ammunition[] = await this.ammunitionRepository.find({
      where: {
        category: category,
      },
      relations: {
        factory: {
          type: true,
        },
        caliber: true,
      },
    });
    return this.mapEntityArrayToDtoArray(ammunitions);
  }

  /**
   * Creer la reference unique de l'arme pour a gestion des stock / recherche ect..
   * @private
   * @param ammunition
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

  private mapEntityArrayToDtoArray(ammunitions: Ammunition[]): AmmunitionDto[] {
    return ammunitions.map((ammuntion) => {
      return {
        id: ammuntion.id,
        name: ammuntion.name,
        description: ammuntion.description,
        headType: ammuntion.headType,
        bodyType: ammuntion.bodyType,
        caliber: ammuntion.caliber,
        category: ammuntion.category,
        factory: {
          id: ammuntion.factory.id,
          type: ammuntion.factory.type,
          name: ammuntion.factory.name,
          description: ammuntion.factory.description,
          ref: ammuntion.factory.ref,
        },
        percussionType: ammuntion.percussionType,
        packaging: ammuntion.packaging,
        initialSpeed: ammuntion.initialSpeed,
        reference: ammuntion.reference,
      };
    });
  }
}
