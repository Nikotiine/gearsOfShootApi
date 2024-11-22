import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { PercussionType } from '../entity/percussion-type.entity';

export default class PercussionTypeSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const types: any = [
      {
        name: 'Centrale',
      },
      {
        name: 'Annulaire',
      },
    ];
    const repository = dataSource.getRepository(PercussionType);
    for (const type of types) {
      await repository.insert([
        {
          name: type.name,
        },
      ]);
    }
  }
}
