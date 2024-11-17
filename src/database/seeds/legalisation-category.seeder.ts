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
        label: 'A',
      },
      {
        label: 'B',
      },
      {
        label: 'C',
      },
      {
        label: 'D',
      },
    ];
    const repository = dataSource.getRepository(LegislationCategory);
    for (const category of categories) {
      await repository.insert([
        {
          label: category.label,
        },
      ]);
    }
  }
}
