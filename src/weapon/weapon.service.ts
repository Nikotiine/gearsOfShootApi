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

  public async createReference(weapon: CreateWeaponDto): Promise<string> {
    const factoryRef = await this.factoryService.findFactoryReferenceById(
      weapon.factoryId,
    );
    const caliber = await this.caliberService.findById(weapon.caliberId);
    return `${factoryRef.toUpperCase()}-${caliber.reference.toUpperCase()}-${weapon.name.toUpperCase()}${weapon.variation ? '-' + weapon.variation.substring(0, 3).toUpperCase() : ''}`;
  }
}
