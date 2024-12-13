import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RailSize } from '../entity/rail-size.entity';

export default class RailSizeSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const sizes: any = [
      {
        size: '21mm',
        reference: 'Picatiny',
      },
      {
        size: '11mm',
        reference: 'Weaver',
      },
      {
        size: 'AUCUN',
        reference: 'NONE',
      },
    ];
    const repository = dataSource.getRepository(RailSize);
    for (const size of sizes) {
      await repository.insert([
        {
          name: size.size,
          reference: size.reference,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
