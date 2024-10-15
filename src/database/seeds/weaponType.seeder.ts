import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponType } from '../entity/weapon-type.entity';

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
    const names: string[] = [
      'Pistolet',
      'Revolver',
      'fusil a verrou',
      'Carabine PCP',
      'Carabine C02',
    ];
    const repository = dataSource.getRepository(WeaponType);
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
