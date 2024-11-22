import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { WeaponBarrelType } from '../entity/weapon-barrel-type.entity';

export default class BarrelTypeSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const types: any = [
      {
        name: 'Lourd',
      },
      {
        name: 'Semi-Lourd',
      },
      {
        name: 'Leger',
      },
    ];
    const repository = dataSource.getRepository(WeaponBarrelType);
    for (const type of types) {
      await repository.insert([
        {
          name: type.name,
        },
      ]);
    }
  }
}
