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
import { FactoryType } from '../enum/factory-types.enum';

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
        type: created.factory.factoryType,
        name: created.factory.name,
        description: created.factory.description,
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
          type: ammuntion.factory.factoryType,
          name: ammuntion.factory.name,
          description: ammuntion.factory.description,
        },
        percussionType: ammuntion.percussionType,
        packaging: ammuntion.packaging,
        initialSpeed: ammuntion.initialSpeed,
        reference: ammuntion.reference,
      };
    });
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
   * Retourne la liste des pre-requis necessaire a l ajout d une munition en bdd
   * Calibre / marque / type d'ogive / type d'etui
   */
  public async getListOfPrerequisitesAmmunitionDto(): Promise<ListOfPrerequisitesAmmunitionDto> {
    const calibers = await this.caliberService.findAll();
    const headTypes = await this.ammunitionHeadTypeService.findAll();
    const bodyTypes = await this.ammunitionBodyTypeService.findAll();
    const factories = await this.factoryService.findByType(
      FactoryType.AMMUNITION,
    );
    return {
      factories: factories,
      calibers: calibers,
      headTypes: headTypes,
      bodyTypes: bodyTypes,
    };
  }
}
