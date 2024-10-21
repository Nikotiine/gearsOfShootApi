import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ThreadedSize } from '../entity/threaded-size.entity';

export default class ThreadedSizeSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const sizes = ['1/2 X 20', '1/2 X 28', 'M9 X 0.75'];
    const repository = dataSource.getRepository(ThreadedSize);
    for (const size of sizes) {
      await repository.insert([
        {
          size: size,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
