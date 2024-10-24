import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponType } from '../../database/entity/weapon-type.entity';
import { Repository } from 'typeorm';
import { CreateWeaponTypeDto, WeaponTypeDto } from '../../dto/weapon.dto';
import { CodeError } from '../../enum/code-error.enum';

@Injectable()
export class WeaponTypeService {
  constructor(
    @InjectRepository(WeaponType)
    private readonly weaponTypeRepository: Repository<WeaponType>,
  ) {}

  /**
   * Retourne tout les type d'arme different
   */
  public async findAll(): Promise<WeaponTypeDto[]> {
    const weaponTypes: WeaponType[] = await this.weaponTypeRepository.find();
    return weaponTypes.map((type) => {
      return {
        id: type.id,
        name: type.name,
        mode: type.mode,
        ref: type.ref,
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
      mode: weaponType.mode,
      ref: weaponType.ref,
    });
    const created = await this.weaponTypeRepository.save(entity);
    return {
      id: created.id,
      name: created.name,
      mode: created.mode,
      ref: created.ref,
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
}
