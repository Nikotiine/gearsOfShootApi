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
  UpdateWeaponDto,
  WeaponDto,
} from '../dto/weapon.dto';
import { CodeError } from '../enum/code-error.enum';
import { ThreadedSizeService } from '../common/threaded-size/threaded-size.service';
import { ApiDeleteResponseDto } from '../dto/api-response.dto';
import { CodeSuccess } from '../enum/code-success.enum';
import { PercussionTypeService } from '../common/percussion-type/percussion-type.service';
import { LegislationCategoryService } from '../common/legislation-category/legislation-category.service';
import { BarrelTypeService } from './barrel-type/barrel-type.service';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    private readonly weaponTypeService: WeaponTypeService,
    private readonly caliberService: CaliberService,
    private readonly factoryService: FactoryService,
    private readonly threadSizeService: ThreadedSizeService,
    private readonly percussionTypeService: PercussionTypeService,
    private readonly legalisationCategoryService: LegislationCategoryService,
    private readonly barrelTypeService: BarrelTypeService,
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
      barrelType: {
        id: weapon.barrelTypeId,
      },
      category: {
        id: weapon.categoryId,
      },
      threadedSize: {
        id: weapon.threadedSizeId,
      },
      adjustableTriggerValue: weapon.adjustableTriggerValue,
      reference: await this.createReference(weapon),
      percussionType: {
        id: weapon.percussionTypeId,
      },
    });
    const created = await this.weaponRepository.save(entity);
    return this.findById(created.id);
  }

  /**
   * Retourne la liste des prerequis de creation d'arme
   * Calibres Marques Types d'armes Taille de Filetage
   */
  public async getListOfPrerequisitesWeaponList(): Promise<ListOfPrerequisitesWeaponDto> {
    const calibers = await this.caliberService.findAll();
    const factories = await this.factoryService.findByType('weapon');
    const types = await this.weaponTypeService.findAll();
    const threadedSizes = await this.threadSizeService.findAll();
    const categories = await this.legalisationCategoryService.findAll();
    const percussionTypes = await this.percussionTypeService.findAll();
    const barreTypes = await this.barrelTypeService.findAll();
    return {
      calibers: calibers,
      factories: factories,
      types: types,
      threadedSizes: threadedSizes,
      categories: categories,
      percussionTypes: percussionTypes,
      barreTypes: barreTypes,
    };
  }

  public async findAllByCategory(categoryId: number): Promise<WeaponDto[]> {
    const weapons: Weapon[] = await this.weaponRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: {
        factory: true,
        caliber: true,
        type: true,
        threadedSize: true,
        barrelType: true,
      },
    });
    return this.mapArrayEntityToArrayDto(weapons);
  }

  public async findAll(): Promise<WeaponDto[]> {
    const weapons = await this.weaponRepository.find({
      relations: {
        factory: true,
        caliber: true,
        type: true,
        threadedSize: true,
        barrelType: true,
      },
    });
    return this.mapArrayEntityToArrayDto(weapons);
  }

  private mapArrayEntityToArrayDto(weapons: Weapon[]): WeaponDto[] {
    return weapons.map((weapon) => {
      return {
        id: weapon.id,
        name: weapon.name,
        variation: weapon.variation,
        factory: {
          id: weapon.factory.id,
          name: weapon.factory.name,
          type: weapon.factory.type,
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
        percussionType: weapon.percussionType,
      };
    });
  }

  public async findById(id: number): Promise<WeaponDto> {
    const weapon = await this.weaponRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: true,
        type: true,
        caliber: true,
        threadedSize: true,
        category: true,
        percussionType: true,
        barrelType: true,
      },
    });
    return this.mapEntityToDto(weapon);
  }

  public async edit(id: number, weapon: UpdateWeaponDto): Promise<WeaponDto> {
    const updateResult = await this.weaponRepository.update(id, {
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
      barrelType: {
        id: weapon.barrelTypeId,
      },
      category: {
        id: weapon.categoryId,
      },
      threadedSize: {
        id: weapon.threadedSizeId,
      },
      adjustableTriggerValue: weapon.adjustableTriggerValue,
      reference: await this.createReference(weapon),
      percussionType: {
        id: weapon.percussionTypeId,
      },
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  private mapEntityToDto(weapon: Weapon): WeaponDto {
    return {
      id: weapon.id,
      barrelLength: weapon.barrelLength,
      name: weapon.name,
      description: weapon.description,
      type: weapon.type,
      threadedSize: weapon.threadedSize,
      reference: weapon.reference,
      adjustableTriggerValue: weapon.adjustableTriggerValue,
      barrelType: weapon.barrelType,
      isAdjustableTrigger: weapon.isAdjustableTrigger,
      isOpticReady: weapon.isOpticReady,
      caliber: weapon.caliber,
      category: weapon.category,
      factory: weapon.factory,
      variation: weapon.variation,
      isThreadedBarrel: weapon.isThreadedBarrel,
      percussionType: weapon.percussionType,
    };
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.weaponRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
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
