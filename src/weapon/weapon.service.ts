import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weapon } from '../database/entity/weapon.entity';
import { Repository } from 'typeorm';
import { WeaponTypeService } from './weapon-type/weapon-type.service';
import { CaliberService } from '../common/caliber/caliber.service';
import { FactoryService } from '../common/factory/factory.service';
import { CreateWeaponDto, WeaponDto } from '../dto/weapon.dto';
import { CodeError } from '../enum/code-error.enum';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    private readonly weaponTypeService: WeaponTypeService,
    private readonly caliberService: CaliberService,
    private readonly factoryService: FactoryService,
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
      weapon.factory.id,
      weapon.caliber.id,
    );
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }
    const entity = this.weaponRepository.create({
      name: weapon.name,
      variation: weapon.variation,
      factory: weapon.factory,
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
}
