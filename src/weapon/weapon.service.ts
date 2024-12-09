import { Injectable } from '@nestjs/common';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { CaliberService } from '../common/caliber/caliber.service';
import { FactoryService } from '../common/factory/factory.service';
import {
  CreateWeaponDto,
  ListOfPrerequisitesWeaponDto,
} from '../dto/weapon.dto';

import { ThreadedSizeService } from '../common/threaded-size/threaded-size.service';

import { PercussionTypeService } from '../common/percussion-type/percussion-type.service';
import { LegislationCategoryService } from '../common/legislation-category/legislation-category.service';
import { BarrelTypeService } from './barrel-type/barrel-type.service';
import { RailSizeService } from '../common/rail-size/rail-size.service';
import { MaterialService } from '../common/material/material.service';
import { TriggerTypeService } from './trigger-type/trigger-type.service';
import { ColorService } from '../common/color/color.service';
import { OpticReadyPlateService } from '../common/optic-ready-plate/optic-ready-plate.service';

@Injectable()
export class WeaponService {
  constructor(
    private readonly weaponTypeService: WeaponTypeService,
    private readonly caliberService: CaliberService,
    private readonly factoryService: FactoryService,
    private readonly threadSizeService: ThreadedSizeService,
    private readonly percussionTypeService: PercussionTypeService,
    private readonly legalisationCategoryService: LegislationCategoryService,
    private readonly barrelTypeService: BarrelTypeService,
    private readonly materialService: MaterialService,
    private readonly railSizeService: RailSizeService,
    private readonly triggerTypeService: TriggerTypeService,
    private readonly colorService: ColorService,
    private readonly opticReadyPlateService: OpticReadyPlateService,
  ) {}

  /**
   * Ajout d une nouvelle arme
   * On verifie avant
   * @param weapon {CreateWeaponDto}
   */
  /*public async insert(weapon: CreateWeaponDto): Promise<WeaponDto> {
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
      providedMagazineQuantity: weapon.providedMagazineQuantity,
      barrelSize: weapon.barrelSize,
      isAdjustableButt: weapon.isAdjustableButt,
      isAdjustableBusk: weapon.isAdjustableBusk,
      buttMaterial: {
        id: weapon.buttMaterialId,
      },
      railSize: {
        id: weapon.railSizeId,
      },
      isPicatinyRailSlop: weapon.isPicatinyRailSlop,
      grenadierSlot: weapon.grenadierSlot,
      qcSlot: weapon.qcSlot,
      isMlockCompatibility: weapon.isMlockCompatibility,
      isOpenAim: weapon.isOpenAim,
      isAdjustableFrontSight: weapon.isAdjustableFrontSight,
      isAdjustableBackSight: weapon.isAdjustableBackSight,
      mLockOptions: weapon.mLockOptions,
      triggerType: {
        id: weapon.triggerTypeId,
      },
      decocking: weapon.decocking,
      slideMaterial: {
        id: weapon.slideMaterialId,
      },
      slideColor: {
        id: weapon.slideColorId,
      },
      barrelColor: {
        id: weapon.barrelColorId,
      },
      buttColor: {
        id: weapon.buttColorId,
      },
      isExternalHammer: weapon.isExternalHammer,
      providedOpticReadyPlate: weapon.providedOpticReadyPlates,
    });
    const created = await this.weaponRepository.save(entity);
    return this.findById(created.id);
  }*/

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
    const buttTypes = await this.materialService.findAll();
    const railSizes = await this.railSizeService.findAll();
    const triggerTypes = await this.triggerTypeService.findAll();
    const colors = await this.colorService.findAll();
    const plates = await this.opticReadyPlateService.findAll();
    return {
      calibers: calibers,
      factories: factories,
      types: types,
      threadedSizes: threadedSizes,
      categories: categories,
      percussionTypes: percussionTypes,
      barreTypes: barreTypes,
      buttTypes: buttTypes,
      railSizes: railSizes,
      triggerTypes: triggerTypes,
      colors: colors,
      opticReadyPlates: plates,
    };
  }

  /*public async findAllByCategory(categoryId: number): Promise<WeaponDto[]> {
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
        providedMagazine: true,
        triggerType: true,
      },
    });
    return this.mapArrayEntityToArrayDto(weapons);
  }*/

  /*  public async findAll(): Promise<WeaponDto[]> {
    const weapons = await this.weaponRepository.find({
      relations: {
        factory: true,
        type: true,
        caliber: true,
        threadedSize: true,
        category: true,
        percussionType: true,
        barrelType: true,
        providedMagazine: true,
        railSize: true,
        buttMaterial: true,
        buttColor: true,
        slideColor: true,
        slideMaterial: true,
        barrelColor: true,
        triggerType: true,
        providedOpticReadyPlate: true,
      },
    });
    return this.mapArrayEntityToArrayDto(weapons);
  }*/

  /* private mapArrayEntityToArrayDto(weapons: Weapon[]): WeaponDto[] {
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
          reference: weapon.factory.reference,
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
        providedMagazineQuantity: weapon.providedMagazineQuantity,
        providedMagazine: weapon.providedMagazine,
        barrelSize: weapon.barrelSize,
        isAdjustableButt: weapon.isAdjustableButt,
        isAdjustableBusk: weapon.isAdjustableBusk,
        buttMaterial: weapon.buttMaterial,
        railSize: weapon.railSize,
        grenadierSlot: weapon.grenadierSlot,
        qcSlot: weapon.qcSlot,
        isMlockCompatibility: weapon.isMlockCompatibility,
        isOpenAim: weapon.isOpenAim,
        isAdjustableFrontSight: weapon.isAdjustableFrontSight,
        isAdjustableBackSight: weapon.isAdjustableBackSight,
        isPicatinyRailSlop: weapon.isPicatinyRailSlop,
        mLockOptions: weapon.mLockOptions,
        decocking: weapon.decocking,
        triggerType: weapon.triggerType,
        buttColor: weapon.buttColor,
        barrelColor: weapon.barrelColor,
        slideMaterial: weapon.slideMaterial,
        slideColor: weapon.slideColor,
        isExternalHammer: weapon.isExternalHammer,
        opticReadyPlates: weapon.providedOpticReadyPlate,
      };
    });
  }*/

  /*  public async findById(id: number): Promise<WeaponDto> {
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
        providedMagazine: true,
        railSize: true,
        buttMaterial: true,
        buttColor: true,
        slideColor: true,
        slideMaterial: true,
        barrelColor: true,
        triggerType: true,
        providedOpticReadyPlate: true,
      },
    });

    return this.mapEntityToDto(weapon);
  }*/

  /*  public async edit(id: number, weapon: UpdateWeaponDto): Promise<WeaponDto> {
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
      barrelSize: weapon.barrelSize,
      isAdjustableButt: weapon.isAdjustableButt,
      isAdjustableBusk: weapon.isAdjustableBusk,
      buttMaterial: {
        id: weapon.buttMaterialId,
      },
      railSize: {
        id: weapon.railSizeId,
      },
      isPicatinyRailSlop: weapon.isPicatinyRailSlop,
      grenadierSlot: weapon.grenadierSlot,
      qcSlot: weapon.qcSlot,
      isMlockCompatibility: weapon.isMlockCompatibility,
      isOpenAim: weapon.isOpenAim,
      isAdjustableFrontSight: weapon.isAdjustableFrontSight,
      isAdjustableBackSight: weapon.isAdjustableBackSight,
      decocking: weapon.decocking,
      triggerType: {
        id: weapon.triggerTypeId,
      },
      slideMaterial: {
        id: weapon.slideMaterialId,
      },
      slideColor: {
        id: weapon.slideColorId,
      },
      barrelColor: {
        id: weapon.barrelColorId,
      },
      buttColor: {
        id: weapon.buttColorId,
      },
      isExternalHammer: weapon.isExternalHammer,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_UPDATE_FAILED);
    }
    return this.findById(id);
  }*/

  /* private mapEntityToDto(weapon: Weapon): WeaponDto {
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
      providedMagazineQuantity: weapon.providedMagazineQuantity,
      providedMagazine: weapon.providedMagazine,
      barrelSize: weapon.barrelSize,
      isAdjustableButt: weapon.isAdjustableButt,
      isAdjustableBusk: weapon.isAdjustableBusk,
      buttMaterial: weapon.buttMaterial,
      railSize: weapon.railSize,
      grenadierSlot: weapon.grenadierSlot,
      qcSlot: weapon.qcSlot,
      isMlockCompatibility: weapon.isMlockCompatibility,
      isOpenAim: weapon.isOpenAim,
      isAdjustableFrontSight: weapon.isAdjustableFrontSight,
      isAdjustableBackSight: weapon.isAdjustableBackSight,
      isPicatinyRailSlop: weapon.isPicatinyRailSlop,
      mLockOptions: weapon.mLockOptions,
      decocking: weapon.decocking,
      triggerType: weapon.triggerType,
      buttColor: weapon.buttColor,
      slideColor: weapon.slideColor,
      slideMaterial: weapon.slideMaterial,
      barrelColor: weapon.barrelColor,
      isExternalHammer: weapon.isExternalHammer,
      opticReadyPlates: weapon.providedOpticReadyPlate,
    };
  }*/

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  /*  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.weaponRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
  }*/

  /**
   * Verifie si l'arme est pas deja presente en base
   * @param name {string} le nom de l'arme
   * @param variation {string} sa variante possible
   * @param factoryId {number} l id de la marque
   * @param caliberId {number} l id du calibre
   * @private
   */
  /*  private async verifyIfIsExist(
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
  }*/

  /**
   * Creer la reference unique de l'arme pour a gestion des stock / recherche ect..
   * @param weapon
   * @private
   */
  public async createReference(weapon: CreateWeaponDto): Promise<string> {
    const factoryRef = await this.factoryService.findFactoryReferenceById(
      weapon.factoryId,
    );
    const caliber = await this.caliberService.findById(weapon.caliberId);
    return `${factoryRef.toUpperCase()}-${caliber.reference.toUpperCase()}-${weapon.name.toUpperCase()}${weapon.variation ? '-' + weapon.variation.substring(0, 3).toUpperCase() : ''}`;
  }
}
