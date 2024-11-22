import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { OpticType } from '../entity/optic-type.entity';

export default class OpticTypeSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const types: any = [
      {
        name: 'Lunette de tir',
        reference: 'TIR',
      },
      {
        name: 'Lunette de chasse',
        reference: 'CHA',
      },
      {
        name: 'Lunette de battue',
        reference: 'BAT',
      },
      {
        name: 'Point rouge',
        reference: 'REDDOT',
      },
    ];
    const repository = dataSource.getRepository(OpticType);
    for (const type of types) {
      await repository.insert([
        {
          name: type.name,
          reference: type.reference,
        },
      ]);
    }
  }
}
