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
        name: 'Coup par coup',
      },
      {
        name: 'Semi-Auto',
      },
      {
        name: 'Automatique',
      },
    ];
    const reloadRepository = dataSource.getRepository(WeaponReloadMode);
    for (const type of reloadTypes) {
      await reloadRepository.insert([
        {
          name: type.name,
        },
      ]);
    }
    const types: CreateWeaponTypeDto[] = [
      {
        name: 'Pistolet',
        modeId: 2,
        reference: 'PIST',
      },
      {
        name: 'Revolver',
        modeId: 1,
        reference: 'REVO',
      },
      {
        name: 'fusil a verrou',
        modeId: 1,
        reference: 'FUVE',
      },
      {
        name: 'Carabine PCP',
        modeId: 1,
        reference: 'CPCP',
      },
      {
        name: 'Carabine C02',
        modeId: 1,
        reference: 'CCO2',
      },
      {
        name: 'AR 15',
        modeId: 2,
        reference: 'AR15',
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
          reference: type.reference,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
