import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weapon } from '../database/entity/weapon.entity';
import { Repository } from 'typeorm';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { CaliberService } from '../common/caliber/caliber.service';
import { FactoryService } from '../common/factory/factory.service';
import {
  CreateWeaponDto,
  ListOfPrerequisitesWeaponDto,
  WeaponDto,
} from '../dto/weapon.dto';
import { CodeError } from '../enum/code-error.enum';
import { FactoryType } from '../enum/factory-types.enum';
import { ThreadedSizeService } from '../common/threaded-size/threaded-size.service';
import { LegislationCategories } from '../enum/legislation-categories.enum';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    private readonly weaponTypeService: WeaponTypeService,
    private readonly caliberService: CaliberService,
    private readonly factoryService: FactoryService,
    private readonly threadSizeService: ThreadedSizeService,
  ) {}

  /**
   * Ajout d une nouvelle arme
   * On verifie avant
   * @param weapon {CreateWeaponDto}
   */
  public async insert(weapon: CreateWeaponDto): Promise<WeaponDto> {
    const isExist = await this.verifyIfIsExist(
      weapon.name,
      weapon.variation,
      weapon.factoryId,
      weapon.caliberId,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }

    const entity: Weapon = this.weaponRepository.create({
      name: weapon.name,
      variation: weapon.variation,
      factory: {
        id: weapon.factoryId,
      },
      isThreadedBarrel: weapon.isThreadedBarrel,
      isAdjustableTrigger: weapon.isAdjustableTrigger,
      isOpticReady: weapon.isOpticReady,
      caliber: {
        id: weapon.caliberId,
      },
      type: {
        id: weapon.typeId,
      },
      description: weapon.description,
      barrelLength: weapon.barrelLength,
      barrelType: weapon.barrelType,
      category: weapon.category,
      threadedSize: {
        id: weapon.threadedSizeId,
      },
      adjustableTriggerValue: weapon.adjustableTriggerValue,
      reference: await this.createReference(weapon),
    });
    const created = await this.weaponRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      variation: created.variation,
      factory: {
        id: created.factory.id,
        name: created.factory.name,
        type: created.factory.factoryType,
        description: created.factory.description,
        ref: created.factory.ref,
      },
      isThreadedBarrel: created.isThreadedBarrel,
      isAdjustableTrigger: created.isAdjustableTrigger,
      isOpticReady: created.isOpticReady,
      caliber: created.caliber,
      type: created.type,
      description: created.description,
      barrelLength: created.barrelLength,
      barrelType: created.barrelType,
      category: created.category,
      threadedSize: created.threadedSize,
      reference: created.reference,
      adjustableTriggerValue: created.adjustableTriggerValue,
    };
  }

  /**
   * Retourne la liste des prerequis de creation d'arme
   * Calibres Marques Types d'armes Taille de Filetage
   */
  public async getListOfPrerequisitesWeaponList(): Promise<ListOfPrerequisitesWeaponDto> {
    const calibers = await this.caliberService.findAll();
    const factories = await this.factoryService.findByType(FactoryType.WEAPON);
    const types = await this.weaponTypeService.findAll();
    const threadedSizes = await this.threadSizeService.findAll();
    return {
      calibers: calibers,
      factories: factories,
      types: types,
      threadedSizes: threadedSizes,
    };
  }

  public async findAllByCategory(
    categoy: LegislationCategories,
  ): Promise<WeaponDto[]> {
    const weapons: Weapon[] = await this.weaponRepository.find({
      where: {
        category: categoy,
      },
      relations: {
        factory: true,
        caliber: true,
        type: true,
        threadedSize: true,
      },
    });
    return weapons.map((weapon) => {
      return {
        id: weapon.id,
        name: weapon.name,
        variation: weapon.variation,
        factory: {
          id: weapon.factory.id,
          name: weapon.factory.name,
          type: weapon.factory.factoryType,
          description: weapon.factory.description,
          ref: weapon.factory.ref,
        },
        isThreadedBarrel: weapon.isThreadedBarrel,
        isAdjustableTrigger: weapon.isAdjustableTrigger,
        isOpticReady: weapon.isOpticReady,
        caliber: weapon.caliber,
        type: weapon.type,
        description: weapon.description,
        barrelLength: weapon.barrelLength,
        barrelType: weapon.barrelType,
        category: weapon.category,
        threadedSize: weapon.threadedSize,
        reference: weapon.reference,
        adjustableTriggerValue: weapon.adjustableTriggerValue,
      };
    });
  }

  /**
   * Verifie si l'arme est pas deja presente en base
   * @param name {string} le nom de l'arme
   * @param variation {string} sa variante possible
   * @param factoryId {number} l id de la marque
   * @param caliberId {number} l id du calibre
   * @private
   */
  private async verifyIfIsExist(
    name: string,
    variation: string,
    factoryId: number,
    caliberId: number,
  ): Promise<boolean> {
    const weapon = await this.weaponRepository.findOne({
      where: {
        name: name,
        variation: variation,
        caliber: {
          id: caliberId,
        },
        factory: {
          id: factoryId,
        },
      },
    });
    return !!weapon;
  }

  /**
   * Creer la reference unique de l'arme pour a gestion des stock / recherche ect..
   * @param weapon
   * @private
   */
  private async createReference(weapon: CreateWeaponDto): Promise<string> {
    const factoryRef = await this.factoryService.findFactoryReferenceById(
      weapon.factoryId,
    );
    const caliber = await this.caliberService.findById(weapon.caliberId);
    return `${factoryRef.toUpperCase()}-${caliber.ref.toUpperCase()}-${weapon.name.toUpperCase()}${weapon.variation ? '-' + weapon.variation.substring(0, 3).toUpperCase() : ''}`;
  }
}
