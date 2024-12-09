import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandGun } from '../../database/entity/hand-gun.entity';
import { Repository } from 'typeorm';
import {
  CreateHandGunDto,
  HandGunDto,
  UpdateHandGunDto,
} from '../../dto/hand-gun.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { WeaponService } from '../weapon.service';

@Injectable()
export class HandGunService {
  constructor(
    @InjectRepository(HandGun)
    private readonly handGunRepository: Repository<HandGun>,
    private readonly weaponService: WeaponService,
  ) {}

  public async insert(handgun: CreateHandGunDto): Promise<HandGunDto> {
    const isExist = await this.verifyIfIsExist(handgun);
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }
    const entity = this.handGunRepository.create({
      name: handgun.name,
      description: handgun.description,
      variation: handgun.variation,
      reference: await this.weaponService.createReference(handgun),
      factory: {
        id: handgun.factoryId,
      },
      isThreadedBarrel: handgun.isThreadedBarrel,
      isAdjustableTrigger: handgun.isAdjustableTrigger,
      isOpticReady: handgun.isOpticReady,
      caliber: {
        id: handgun.caliberId,
      },
      type: {
        id: handgun.typeId,
      },
      barrelLength: handgun.barrelLength,
      barrelType: {
        id: handgun.barrelTypeId,
      },
      barrelColor: {
        id: handgun.barrelColorId,
      },
      category: {
        id: handgun.categoryId,
      },
      threadedSize: {
        id: handgun.threadedSizeId,
      },
      adjustableTriggerValue: handgun.adjustableTriggerValue,
      providedMagazineQuantity: handgun.providedMagazineQuantity,
      percussionType: {
        id: handgun.percussionTypeId,
      },
      barrelSize: handgun.barrelSize,
      slideMaterial: {
        id: handgun.slideMaterialId,
      },
      slideColor: {
        id: handgun.slideColorId,
      },
      buttMaterial: {
        id: handgun.buttMaterialId,
      },
      buttColor: {
        id: handgun.buttColorId,
      },
      isAdjustableFrontSight: handgun.isAdjustableFrontSight,
      isAdjustableBackSight: handgun.isAdjustableBackSight,
      triggerType: {
        id: handgun.triggerTypeId,
      },
      decocking: handgun.decocking,
      isExternalHammer: handgun.isExternalHammer,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
    });
    const created = await this.handGunRepository.save(entity);
    return this.findById(created.id);
  }

  public async update(
    id: number,
    handgun: UpdateHandGunDto,
  ): Promise<HandGunDto> {
    const updateResult = await this.handGunRepository.update(id, {
      adjustableTriggerValue: handgun.adjustableTriggerValue,
      barrelColor: {
        id: handgun.barrelColorId,
      },
      barrelLength: handgun.barrelLength,
      barrelSize: handgun.barrelSize,
      barrelType: {
        id: handgun.barrelTypeId,
      },
      buttColor: {
        id: handgun.buttColorId,
      },
      buttMaterial: {
        id: handgun.buttMaterialId,
      },
      caliber: {
        id: handgun.caliberId,
      },
      category: {
        id: handgun.categoryId,
      },
      decocking: handgun.decocking,
      description: handgun.description,
      factory: {
        id: handgun.factoryId,
      },
      isAdjustableBackSight: handgun.isAdjustableBackSight,
      isAdjustableFrontSight: handgun.isAdjustableFrontSight,
      isAdjustableTrigger: handgun.isAdjustableTrigger,
      isExternalHammer: handgun.isExternalHammer,
      isOpticReady: handgun.isOpticReady,
      isThreadedBarrel: handgun.isThreadedBarrel,
      name: handgun.name,
      percussionType: {
        id: handgun.percussionTypeId,
      },
      providedMagazineQuantity: handgun.providedMagazineQuantity,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
      reference: await this.weaponService.createReference(handgun),
      slideColor: {
        id: handgun.slideColorId,
      },
      slideMaterial: {
        id: handgun.slideMaterialId,
      },
      threadedSize: {
        id: handgun.threadedSizeId,
      },
      triggerType: {
        id: handgun.triggerTypeId,
      },
      type: {
        id: handgun.typeId,
      },
      variation: handgun.variation,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  public async findById(id: number): Promise<HandGunDto> {
    const handGunEntity = await this.handGunRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        slideMaterial: true,
        slideColor: true,
        factory: true,
        buttMaterial: true,
        buttColor: true,
        triggerType: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
      },
    });
    if (!handGunEntity) {
      throw new NotFoundException(CodeError.WEAPON_NOT_FOUND);
    }
    return this.mapEntityToDto(handGunEntity);
  }

  public async findAll(): Promise<HandGunDto[]> {
    const handGuns = await this.handGunRepository.find({
      relations: {
        slideMaterial: true,
        slideColor: true,
        factory: true,
        buttMaterial: true,
        buttColor: true,
        triggerType: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(handGuns);
  }

  public async findAllByCategory(categoryId: number): Promise<HandGunDto[]> {
    const handGuns = await this.handGunRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: {
        slideMaterial: true,
        slideColor: true,
        factory: true,
        buttMaterial: true,
        buttColor: true,
        triggerType: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(handGuns);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.handGunRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
  }

  /**
   * Verifie si l'arme est pas deja presente en base
   * @private
   * @param newEntity {CreateHandGunDto}
   */
  private async verifyIfIsExist(newEntity: CreateHandGunDto): Promise<boolean> {
    const handGun = await this.handGunRepository.findOne({
      where: {
        name: newEntity.name,
        variation: newEntity.variation,
        caliber: {
          id: newEntity.caliberId,
        },
        factory: {
          id: newEntity.factoryId,
        },
      },
    });
    return !!handGun;
  }

  private mapEntityToDto(handGun: HandGun): HandGunDto {
    return {
      id: handGun.id,
      barrelLength: handGun.barrelLength,
      name: handGun.name,
      description: handGun.description,
      type: handGun.type,
      threadedSize: handGun.threadedSize,
      reference: handGun.reference,
      adjustableTriggerValue: handGun.adjustableTriggerValue,
      barrelType: handGun.barrelType,
      isAdjustableTrigger: handGun.isAdjustableTrigger,
      isOpticReady: handGun.isOpticReady,
      caliber: handGun.caliber,
      category: handGun.category,
      factory: handGun.factory,
      variation: handGun.variation,
      isThreadedBarrel: handGun.isThreadedBarrel,
      percussionType: handGun.percussionType,
      providedMagazineQuantity: handGun.providedMagazineQuantity,
      providedMagazine: handGun.providedMagazine,
      barrelSize: handGun.barrelSize,
      buttMaterial: handGun.buttMaterial,
      isAdjustableFrontSight: handGun.isAdjustableFrontSight,
      isAdjustableBackSight: handGun.isAdjustableBackSight,
      isPicatinyRailSlop: handGun.isPicatinyRailSlop,
      decocking: handGun.decocking,
      triggerType: handGun.triggerType,
      buttColor: handGun.buttColor,
      slideColor: handGun.slideColor,
      slideMaterial: handGun.slideMaterial,
      barrelColor: handGun.barrelColor,
      isExternalHammer: handGun.isExternalHammer,
      opticReadyPlates: handGun.providedOpticReadyPlate,
    };
  }

  private mapEntityArrayToDtoArray(handGuns: HandGun[]): HandGunDto[] {
    return handGuns.map((handGun) => {
      return this.mapEntityToDto(handGun);
    });
  }
}
