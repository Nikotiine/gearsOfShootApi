import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { LegislationCategory } from '../entity/legislation-category.entity';

export default class LegalisationCategorySeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categories: any = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
    ];
    const repository = dataSource.getRepository(LegislationCategory);
    for (const category of categories) {
      await repository.insert([
        {
          name: category.name,
        },
      ]);
    }
  }
}
