import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Riffle } from '../../database/entity/riffle.entity';
import { Repository } from 'typeorm';
import {
  CreateRiffleDto,
  RiffleDto,
  UpdateRiffleDto,
} from '../../dto/riffle.dto';

import { CodeError } from '../../enum/code-error.enum';
import { WeaponService } from '../weapon.service';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
@Injectable()
export class RiffleService {
  constructor(
    @InjectRepository(Riffle)
    private readonly riffleRepository: Repository<Riffle>,
    private readonly weaponService: WeaponService,
  ) {}

  public async insert(riffle: CreateRiffleDto): Promise<RiffleDto> {
    const isExist = await this.verifyIfIsExist(riffle);
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_IS_EXIST);
    }
    const entity = this.riffleRepository.create({
      name: riffle.name,
      variation: riffle.variation,
      factory: {
        id: riffle.factoryId,
      },
      isThreadedBarrel: riffle.isThreadedBarrel,
      isAdjustableTrigger: riffle.isAdjustableTrigger,

      caliber: {
        id: riffle.caliberId,
      },
      type: {
        id: riffle.typeId,
      },
      description: riffle.description,
      barrelLength: riffle.barrelLength,
      barrelType: {
        id: riffle.barrelTypeId,
      },
      category: {
        id: riffle.categoryId,
      },
      threadedSize: {
        id: riffle.threadedSizeId,
      },
      adjustableTriggerValue: riffle.adjustableTriggerValue,
      reference: await this.weaponService.createReference(riffle),
      percussionType: {
        id: riffle.percussionTypeId,
      },
      providedMagazineQuantity: riffle.providedMagazineQuantity,
      barrelSize: riffle.barrelSize,
      isAdjustableButt: riffle.isAdjustableButt,
      isAdjustableBusk: riffle.isAdjustableBusk,
      buttMaterial: {
        id: riffle.buttMaterialId,
      },
      railSize: {
        id: riffle.railSizeId,
      },
      grenadierSlot: riffle.grenadierSlot,
      qcSlot: riffle.qcSlot,
      isMlockCompatibility: riffle.isMlockCompatibility,
      isOpenAim: riffle.isOpenAim,
      isAdjustableFrontSight: riffle.isAdjustableFrontSight,
      isAdjustableBackSight: riffle.isAdjustableBackSight,
      mLockOptions: riffle.mLockOptions,
      barrelColor: {
        id: riffle.barrelColorId,
      },
      buttColor: {
        id: riffle.buttColorId,
      },
    });
    const created = await this.riffleRepository.save(entity);
    return this.findById(created.id);
  }

  public async update(id: number, riffle: UpdateRiffleDto): Promise<RiffleDto> {
    const updateResult = await this.riffleRepository.update(id, {
      name: riffle.name,
      variation: riffle.variation,
      factory: {
        id: riffle.factoryId,
      },
      isThreadedBarrel: riffle.isThreadedBarrel,
      isAdjustableTrigger: riffle.isAdjustableTrigger,

      caliber: {
        id: riffle.caliberId,
      },
      type: {
        id: riffle.typeId,
      },
      description: riffle.description,
      barrelLength: riffle.barrelLength,
      barrelType: {
        id: riffle.barrelTypeId,
      },
      category: {
        id: riffle.categoryId,
      },
      threadedSize: {
        id: riffle.threadedSizeId,
      },
      adjustableTriggerValue: riffle.adjustableTriggerValue,
      reference: await this.weaponService.createReference(riffle),
      percussionType: {
        id: riffle.percussionTypeId,
      },
      providedMagazineQuantity: riffle.providedMagazineQuantity,
      barrelSize: riffle.barrelSize,
      isAdjustableButt: riffle.isAdjustableButt,
      isAdjustableBusk: riffle.isAdjustableBusk,
      buttMaterial: {
        id: riffle.buttMaterialId,
      },
      railSize: {
        id: riffle.railSizeId,
      },
      grenadierSlot: riffle.grenadierSlot,
      qcSlot: riffle.qcSlot,
      isMlockCompatibility: riffle.isMlockCompatibility,
      isOpenAim: riffle.isOpenAim,
      isAdjustableFrontSight: riffle.isAdjustableFrontSight,
      isAdjustableBackSight: riffle.isAdjustableBackSight,
      mLockOptions: riffle.mLockOptions,
      barrelColor: {
        id: riffle.barrelColorId,
      },
      buttColor: {
        id: riffle.buttColorId,
      },
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  public async findById(id: number): Promise<RiffleDto> {
    const riffleEntity = await this.riffleRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        factory: true,
        buttMaterial: true,
        buttColor: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
        railSize: true,
      },
    });
    if (!riffleEntity) {
      throw new NotFoundException(CodeError.WEAPON_NOT_FOUND);
    }
    return this.mapEntityToDto(riffleEntity);
  }

  public async findAll(): Promise<RiffleDto[]> {
    const riffles = await this.riffleRepository.find({
      relations: {
        factory: true,
        buttMaterial: true,
        buttColor: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
        railSize: true,
      },
    });
    return riffles.length === 0 ? [] : this.mapEntityArrayToDtoArray(riffles);
    // return this.mapEntityArrayToDtoArray(riffles);
  }

  public async findAllByCategory(categoryId: number): Promise<RiffleDto[]> {
    const riffles = await this.riffleRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: {
        factory: true,
        buttMaterial: true,
        buttColor: true,
        threadedSize: true,
        percussionType: true,
        category: true,
        caliber: true,
        type: true,
        barrelType: true,
        railSize: true,
      },
    });
    return this.mapEntityArrayToDtoArray(riffles);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.riffleRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_DELETE,
    };
  }

  /**
   * Verifie si l'arme est pas deja presente en base
   * @private
   * @param newEntity {CreateRiffleDto}
   */
  private async verifyIfIsExist(newEntity: CreateRiffleDto): Promise<boolean> {
    const handGun = await this.riffleRepository.findOne({
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

  private mapEntityToDto(riffle: Riffle): RiffleDto {
    return {
      id: riffle.id,
      barrelLength: riffle.barrelLength,
      name: riffle.name,
      description: riffle.description,
      type: riffle.type,
      threadedSize: riffle.threadedSize,
      reference: riffle.reference,
      adjustableTriggerValue: riffle.adjustableTriggerValue,
      barrelType: riffle.barrelType,
      isAdjustableTrigger: riffle.isAdjustableTrigger,
      caliber: riffle.caliber,
      category: riffle.category,
      factory: riffle.factory,
      variation: riffle.variation,
      isThreadedBarrel: riffle.isThreadedBarrel,
      percussionType: riffle.percussionType,
      providedMagazineQuantity: riffle.providedMagazineQuantity,
      providedMagazine: riffle.providedMagazine,
      barrelSize: riffle.barrelSize,
      isAdjustableButt: riffle.isAdjustableButt,
      isAdjustableBusk: riffle.isAdjustableBusk,
      buttMaterial: riffle.buttMaterial,
      railSize: riffle.railSize,
      grenadierSlot: riffle.grenadierSlot,
      qcSlot: riffle.qcSlot,
      isMlockCompatibility: riffle.isMlockCompatibility,
      isOpenAim: riffle.isOpenAim,
      isAdjustableFrontSight: riffle.isAdjustableFrontSight,
      isAdjustableBackSight: riffle.isAdjustableBackSight,
      mLockOptions: riffle.mLockOptions,
      buttColor: riffle.buttColor,
      barrelColor: riffle.barrelColor,
    };
  }

  private mapEntityArrayToDtoArray(riffles: Riffle[]): RiffleDto[] {
    return riffles.map((riffle) => {
      return this.mapEntityToDto(riffle);
    });
  }
}
