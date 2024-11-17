import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponType } from '../entity/weapon-type.entity';
import { CreateWeaponTypeDto } from '../../dto/weapon.dto';
import { WeaponReloadMode } from '../entity/weapon-reload-mode.entity';

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
    const reloadTypes: any = [
      {
        label: 'Coup par coup',
      },
      {
        label: 'Semi-Auto',
      },
      {
        label: 'Automatique',
      },
    ];
    const reloadRepository = dataSource.getRepository(WeaponReloadMode);
    for (const type of reloadTypes) {
      await reloadRepository.insert([
        {
          label: type.label,
        },
      ]);
    }
    const types: CreateWeaponTypeDto[] = [
      {
        name: 'Pistolet',
        modeId: 2,
        ref: 'PIST',
      },
      {
        name: 'Revolver',
        modeId: 1,
        ref: 'REVO',
      },
      {
        name: 'fusil a verrou',
        modeId: 1,
        ref: 'FUVE',
      },
      {
        name: 'Carabine PCP',
        modeId: 1,
        ref: 'CPCP',
      },
      {
        name: 'Carabine C02',
        modeId: 1,
        ref: 'CCO2',
      },
      {
        name: 'AR 15',
        modeId: 2,
        ref: 'AR15',
      },
    ];
    const repository = dataSource.getRepository(WeaponType);
    for (const type of types) {
      await repository.insert([
        {
          name: type.name,
          mode: {
            id: type.modeId,
          },
          ref: type.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
