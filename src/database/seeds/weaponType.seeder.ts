import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponType } from '../entity/weapon-type.entity';
import { CreateWeaponTypeDto } from '../../dto/weapon.dto';
import { WeaponReloadMode } from '../../enum/weapon-type-main-category.enum';

export default class WeaponTypeSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const types: CreateWeaponTypeDto[] = [
      {
        name: 'Pistolet',
        mode: WeaponReloadMode.SEMI_AUTO,
        ref: 'PIST',
      },
      {
        name: 'Revolver',
        mode: WeaponReloadMode.LINEAR,
        ref: 'REVO',
      },
      {
        name: 'fusil a verrou',
        mode: WeaponReloadMode.LINEAR,
        ref: 'FUVE',
      },
      {
        name: 'Carabine PCP',
        mode: WeaponReloadMode.LINEAR,
        ref: 'CPCP',
      },
      {
        name: 'Carabine C02',
        mode: WeaponReloadMode.LINEAR,
        ref: 'CCO2',
      },
      {
        name: 'AR 15',
        mode: WeaponReloadMode.SEMI_AUTO,
        ref: 'AR15',
      },
    ];
    const repository = dataSource.getRepository(WeaponType);
    for (const type of types) {
      await repository.insert([
        {
          name: type.name,
          mode: type.mode,
          ref: type.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
