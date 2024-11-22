import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { OpticFocalPlane } from '../entity/optic-focal-plane.entity';

export default class OpticFocalPlaneSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const units: any = [
      {
        name: 'FFP',
      },
      {
        name: 'SFP',
      },
    ];
    const repository = dataSource.getRepository(OpticFocalPlane);
    for (const unit of units) {
      await repository.insert([
        {
          name: unit.name,
        },
      ]);
    }
  }
}
