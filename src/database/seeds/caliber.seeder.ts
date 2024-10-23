import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Caliber } from '../entity/caliber.entity';
import { CreateCaliberDto } from '../../dto/caliber.dto';

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
    const calibers: CreateCaliberDto[] = [
      {
        name: '22LR',
        ref: '22LR',
      },
      {
        name: '45 ACP',
        ref: '.45',
      },
      {
        name: '9 MM',
        ref: '9PARA',
      },
      {
        name: '338 LM',
        ref: '338',
      },
      {
        name: '308W',
        ref: '308W',
      },
      {
        name: '17HMR',
        ref: '17HMR',
      },
    ];
    const repository = dataSource.getRepository(Caliber);
    for (const caliber of calibers) {
      await repository.insert([
        {
          name: caliber.name,
          ref: caliber.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
