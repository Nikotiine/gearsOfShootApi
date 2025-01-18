import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MLockOption } from '../entity/m-lock-option.entity';

export default class MLockOptionSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const options = [
      {
        name: '3 Heures',
      },
      {
        name: '6 Heures',
      },
      {
        name: '9 Heures',
      },
    ];
    const repository = dataSource.getRepository(MLockOption);
    for (const option of options) {
      await repository.insert([
        {
          name: option.name,
        },
      ]);
    }
  }
}
