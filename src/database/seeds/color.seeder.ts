import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Color } from '../entity/color.entity';

export default class ColorSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const colors = [
      {
        name: 'Noir',
        reference: 'BK',
      },
      {
        name: 'FDE',
        reference: 'FDE',
      },
      {
        name: 'TAN',
        reference: 'TAN',
      },
      {
        name: 'Bois',
        reference: 'Bois',
      },
      {
        name: 'Bleu',
        reference: 'BLUE',
      },
    ];

    const repository = dataSource.getRepository(Color);
    for (const color of colors) {
      await repository.insert([
        {
          name: color.name,
          reference: color.reference,
        },
      ]);
    }
  }
}
