import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponType } from '../entity/weaponType.entity';
import { Caliber } from '../entity/caliber.entity';

export default class CaliberSeeder implements Seeder {
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
    const names: string[] = [
      '22LR',
      '17HMR',
      '308W',
      '338 LM',
      '9 MM',
      '45 ACP',
    ];
    const repository = dataSource.getRepository(Caliber);
    for (const name of names) {
      await repository.insert([
        {
          name: name,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
