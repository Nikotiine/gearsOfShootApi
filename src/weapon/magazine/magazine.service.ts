import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponMagazine } from '../../database/entity/weapon-magazine.entity';
import { Repository } from 'typeorm';
import { WeaponMagazineDto } from '../../dto/weapon-magazine.dto';
import { ApiDeleteResponseDto } from '../../dto/api-response.dto';
import { CodeSuccess } from '../../enum/code-success.enum';
import { FactoryService } from '../../common/factory/factory.service';
import { CaliberService } from '../../common/caliber/caliber.service';
import { CodeError } from '../../enum/code-error.enum';
import { MaterialService } from '../../common/material/material.service';
import { LegislationCategoryService } from '../../common/legislation-category/legislation-category.service';
import {
  CreateWeaponMagazineDto,
  ListOfPrerequisitesWeaponMagazineDto,
  UpdateWeaponMagazineDto,
} from '../../dto/create-magazine.dto';
import { RiffleService } from '../riffle/riffle.service';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(WeaponMagazine)
    private readonly weaponMagazineRepository: Repository<WeaponMagazine>,
    private readonly materialService: MaterialService,
    private readonly factoryService: FactoryService,
    private readonly caliberService: CaliberService,
    private readonly legalisationCategoryService: LegislationCategoryService,
    private readonly riffleService: RiffleService,
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
      caliber: {
        id: magazine.caliberId,
      },
      factory: {
        id: magazine.factoryId,
      },
      capacity: magazine.capacity,
      body: {
        id: magazine.bodyId,
      },
      length: magazine.length,
      reference: magazine.reference,
      category: {
        id: magazine.categoryId,
      },
      riffles: magazine.compatibleRiffle,
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
      },
    });
    return this.mapEntityToDto(magazine);
  }

  public async getListOfPrerequisitesWeaponMagazineList(): Promise<ListOfPrerequisitesWeaponMagazineDto> {
    const factories = await this.factoryService.findByType('magazine');
    const calibers = await this.caliberService.findAll();
    const bodies = await this.materialService.findAll();
    const categories = await this.legalisationCategoryService.findAll();
    // const riffles = await this.riffleService.findAll();
    return {
      calibers: calibers,
      bodies: bodies,
      factories: factories,
      categories: categories,
    };
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
      caliber: {
        id: magazine.caliberId,
      },
      factory: {
        id: magazine.factoryId,
      },
      body: {
        id: magazine.bodyId,
      },
      length: magazine.length,
      reference: magazine.reference,
      height: magazine.height,
      capacity: magazine.capacity,
      width: magazine.width,
      category: {
        id: magazine.categoryId,
      },
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
      },
    });
    return this.mapEntityArrayToDtoArray(magazines);
  }
}
