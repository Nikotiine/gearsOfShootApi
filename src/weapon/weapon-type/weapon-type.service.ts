import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponType } from '../../database/entity/weapon-type.entity';
import { Repository } from 'typeorm';
import {
  CreateWeaponTypeDto,
  ListOfPrerequisitesWeaponTypeDto,
  UpdateWeaponTypeDto,
  WeaponTypeDto,
} from '../../dto/weapon.dto';
import { CodeError } from '../../enum/code-error.enum';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';

import { ReloadModeService } from '../reload-mode/reload-mode.service';

@Injectable()
export class WeaponTypeService {
  constructor(
    @InjectRepository(WeaponType)
    private readonly weaponTypeRepository: Repository<WeaponType>,
    private readonly reloadModeService: ReloadModeService,
  ) {}

  /**
   * Retourne tout les type d'arme different
   */
  public async findAll(): Promise<WeaponTypeDto[]> {
    const weaponTypes: WeaponType[] = await this.weaponTypeRepository.find({
      select: {
        id: true,
        name: true,
        mode: {
          id: true,
          name: true,
        },
        reference: true,
      },
    });
    return weaponTypes.map((type) => {
      return {
        id: type.id,
        name: type.name,
        mode: type.mode,
        reference: type.reference,
      };
    });
  }

  /**
   * Ajout d'un nouveau type d'arme
   * On verfie avant l'insertion si le nom est pas deja present en bdd
   * @param weaponType {CreateWeaponTypeDto}
   */
  public async insert(weaponType: CreateWeaponTypeDto): Promise<WeaponTypeDto> {
    const isExist = await this.findByName(weaponType.name);
    if (isExist) {
      throw new BadRequestException(CodeError.WEAPON_TYPE_NAME_USED);
    }
    const entity = this.weaponTypeRepository.create({
      name: weaponType.name,
      mode: {
        id: weaponType.modeId,
      },
      reference: weaponType.reference,
    });
    const created = await this.weaponTypeRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      mode: created.mode,
      reference: created.reference,
    };
  }

  /**
   * Soft delete du type d arme
   * @param id {number} id du type d arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.weaponTypeRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.WEAPON_TYPE_DELETE,
    };
  }

  public async edit(
    id: number,
    type: UpdateWeaponTypeDto,
  ): Promise<WeaponTypeDto> {
    const updateResult = await this.weaponTypeRepository.update(id, {
      reference: type.reference,
      name: type.name,
      mode: {
        id: type.modeId,
      },
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_TYPE_UPDATE_FAILED);
    }
    return await this.findById(id);
  }

  private async findById(id: number): Promise<WeaponTypeDto> {
    const type = await this.weaponTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        mode: true,
      },
    });
    return {
      id: type.id,
      name: type.name,
      reference: type.reference,
      mode: type.mode,
    };
  }

  /**
   * Retourne un weaponType si il est trouver par son nom
   * @param name {string} nom du type d'arme
   * @private
   */
  private async findByName(name: string): Promise<WeaponType> {
    return this.weaponTypeRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findPrerequisitesWeaponTypeDto(): Promise<ListOfPrerequisitesWeaponTypeDto> {
    const modes = await this.reloadModeService.findAll();
    return {
      modes: modes,
    };
  }
}
