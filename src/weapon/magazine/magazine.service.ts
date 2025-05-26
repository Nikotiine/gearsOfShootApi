import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponMagazine } from '../../database/entity/weapon-magazine.entity';
import { Repository } from 'typeorm';
import { WeaponMagazineDto } from '../../dto/weapon-magazine.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { CodeError } from '../../enum/code-error.enum';
import {
  CreateWeaponMagazineDto,
  UpdateWeaponMagazineDto,
} from '../../dto/create-magazine.dto';
import { RiffleService } from '../riffle/riffle.service';
import { HandGunService } from '../hand-gun/hand-gun.service';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(WeaponMagazine)
    private readonly weaponMagazineRepository: Repository<WeaponMagazine>,
    private readonly riffleService: RiffleService,
    private readonly handGunService: HandGunService,
  ) {}

  /**
   * Retourne tous les chargeur disponible
   */
  public async findAll(): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find();
    return this.mapEntityArrayToDtoArray(magazines);
  }

  /**
   * Ajout d'un nouveau chargeur en bdd
   * @param magazine
   */
  public async insert(
    magazine: CreateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    const entity = this.weaponMagazineRepository.create({
      width: magazine.width,
      height: magazine.height,
      caliber: magazine.caliber,
      factory: magazine.factory,
      body: magazine.body,
      capacity: magazine.capacity,
      length: magazine.length,
      reference: await this.createReference(magazine),
      category: magazine.category,
      riffles: magazine.compatibleRiffle,
      handguns: magazine.compatibleHandGun,
      forWeaponType: magazine.weaponType,
    });
    const created = await this.weaponMagazineRepository.save(entity);
    return this.findById(created.id);
  }

  public async findById(id: number): Promise<WeaponMagazineDto> {
    const magazine = await this.weaponMagazineRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: {
          factory: true,
        },
        riffles: {
          factory: true,
        },
        forWeaponType: true,
      },
    });
    return this.mapEntityToDto(magazine);
  }

  /**
   * Soft delete de l arme
   * @param id {number} id de l arme
   */
  public async delete(id: number): Promise<ApiDeleteResponseDto> {
    const deleted = await this.weaponMagazineRepository.softDelete(id);
    return {
      id: id,
      isSuccess: deleted.affected > 0,
      message: CodeSuccess.MAGAZINE_DELETE,
    };
  }

  public async edit(
    id: number,
    magazine: UpdateWeaponMagazineDto,
  ): Promise<WeaponMagazineDto> {
    const updateResult = await this.weaponMagazineRepository.update(id, {
      caliber: magazine.caliber,
      factory: magazine.factory,
      body: magazine.body,
      length: magazine.length,
      reference: await this.createReference(magazine),
      height: magazine.height,
      capacity: magazine.capacity,
      width: magazine.width,
      category: magazine.category,
      forWeaponType: magazine.weaponType,
    });
    if (updateResult.affected === 0) {
      throw new BadRequestException(CodeError.WEAPON_MAGAZINE_UPDATE_FAILED);
    }
    return this.findById(id);
  }

  /**
   * Transforme un tableau de chargeur ( entite bdd ) en DTO
   * @param magazines
   * @private
   */
  private mapEntityArrayToDtoArray(
    magazines: WeaponMagazine[],
  ): WeaponMagazineDto[] {
    const array: WeaponMagazineDto[] = [];
    for (const magazine of magazines) {
      array.push(this.mapEntityToDto(magazine));
    }
    return array;
  }

  private mapEntityToDto(magazine: WeaponMagazine): WeaponMagazineDto {
    return {
      id: magazine.id,
      body: magazine.body,
      caliber: magazine.caliber,
      factory: magazine.factory,
      reference: magazine.reference,
      height: magazine.height,
      length: magazine.length,
      width: magazine.width,
      capacity: magazine.capacity,
      category: magazine.category,
      riffles: magazine.riffles
        ? this.riffleService.mapEntityArrayToDtoArray(magazine.riffles)
        : [],
      handguns: magazine.handguns
        ? this.handGunService.mapEntityArrayToDtoArray(magazine.handguns)
        : [],
      forWeaponType: magazine.forWeaponType,
      description: magazine.description,
    };
  }

  public async findByFactory(
    factoryName: string,
  ): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        factory: {
          name: factoryName,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  public async findByRiffleCompatibility(
    riffleId: number,
  ): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        riffles: {
          id: riffleId,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  public async findByCategory(category: number): Promise<WeaponMagazineDto[]> {
    const magazines = await this.weaponMagazineRepository.find({
      where: {
        category: {
          id: category,
        },
      },
      relations: {
        body: true,
        caliber: true,
        factory: true,
        category: true,
        handguns: true,
        riffles: true,
        forWeaponType: true,
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }

  private async createReference(
    magazine: CreateWeaponMagazineDto,
  ): Promise<string> {
    return `${magazine.factory.reference.substring(0, 3)}-${magazine.caliber.reference.toUpperCase()}-${magazine.capacity}/${magazine.body.reference}`;
  }
}
