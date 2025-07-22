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
import { PriceHistoryService } from '../../common/price-history/price-history.service';
import { PriceableObjectType } from '../../enum/priceable-object-type.enum';
import { PriceHistoryDto } from '../../dto/price-history.dto';

@Injectable()
export class HandGunService {
  constructor(
    @InjectRepository(HandGun)
    private readonly handGunRepository: Repository<HandGun>,
    private readonly priceHistoryService: PriceHistoryService,
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
      reference: this.createReference(handgun),
      factory: handgun.factory,
      isThreadedBarrel: handgun.isThreadedBarrel,
      isAdjustableTrigger: handgun.isAdjustableTrigger,
      isOpticReady: handgun.isOpticReady,
      caliber: handgun.caliber,
      type: handgun.type,
      barrelLength: handgun.barrelLength,
      barrelType: handgun.barrelType,
      barrelColor: handgun.barrelColor,
      category: handgun.category,
      threadedSize: handgun.threadedSize,
      adjustableTriggerMaxWeight: handgun.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: handgun.adjustableTriggerMinWeight,
      providedMagazineQuantity: handgun.providedMagazineQuantity,
      percussionType: handgun.percussionType,
      barrelSize: handgun.barrelSize,
      slideMaterial: handgun.slideMaterial,
      slideColor: handgun.slideColor,
      buttMaterial: handgun.buttMaterial,
      buttColor: handgun.buttColor,
      isAdjustableFrontSight: handgun.isAdjustableFrontSight,
      isAdjustableBackSight: handgun.isAdjustableBackSight,
      triggerType: handgun.triggerType,
      decocking: handgun.decocking,
      isExternalHammer: handgun.isExternalHammer,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
    });
    const created = await this.handGunRepository.save(entity);
    const price = await this.priceHistoryService.addPriceHistory(
      handgun.priceHistory,
      created.id,
      PriceableObjectType.HANDGUN,
    );
    return this.mapEntityToDto(created, price);
  }

  //TODO:Verifier si update ou preload est mieux
  public async update(
    id: number,
    handgun: UpdateHandGunDto,
  ): Promise<HandGunDto> {
    const updateResult = await this.handGunRepository.preload({
      id: id,
      ...handgun,
      providedOpticReadyPlate: handgun.providedOpticReadyPlates,
      barrelType: handgun.barrelType,
      barrelColor: handgun.barrelColor,
      buttColor: handgun.buttColor,
      buttMaterial: handgun.buttMaterial,
      caliber: handgun.caliber,
      category: handgun.category,
      factory: handgun.factory,
      percussionType: handgun.percussionType,
      reference: this.createReference(handgun),
      slideColor: handgun.slideColor,
      slideMaterial: handgun.slideMaterial,
      threadedSize: handgun.threadedSize,
      triggerType: handgun.triggerType,
      type: handgun.type,
    });

    await this.handGunRepository.save(updateResult);
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
        type: {
          mode: true,
        },
        barrelType: true,
        providedOpticReadyPlate: true,
        barrelColor: true,
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

  public async findAllByCategory(category: string): Promise<HandGunDto[]> {
    const handGuns = await this.handGunRepository.find({
      where: {
        category: {
          name: category,
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
        caliber: newEntity.caliber,
        factory: newEntity.factory,
      },
    });
    return !!handGun;
  }

  private async mapEntityToDto(
    handGun: HandGun,
    price?: PriceHistoryDto,
  ): Promise<HandGunDto> {
    return {
      id: handGun.id,
      barrelLength: handGun.barrelLength,
      name: handGun.name,
      description: handGun.description,
      type: handGun.type,
      threadedSize: handGun.threadedSize,
      reference: handGun.reference,
      adjustableTriggerMaxWeight: handGun.adjustableTriggerMaxWeight,
      adjustableTriggerMinWeight: handGun.adjustableTriggerMinWeight,
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
      providedOpticReadyPlates: handGun.providedOpticReadyPlate,
      priceHistory: price
        ? price
        : await this.priceHistoryService.findLastByObjectId(
            handGun.id,
            PriceableObjectType.HANDGUN,
          ),
    };
  }

  public async mapEntityArrayToDtoArray(
    handGuns: HandGun[],
  ): Promise<HandGunDto[]> {
    const dtoPromises = handGuns.map(async (handGun) => {
      return this.mapEntityToDto(handGun);
    });
    return await Promise.all(dtoPromises);
  }

  private createReference(dto: CreateHandGunDto): string {
    return `${dto.factory.reference.substring(0, 4)}-${dto.name}-${dto.caliber.reference}`;
  }
}
