import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ThreadedSize } from '../entity/threaded-size.entity';
import { CreateThreadedSizeDto } from '../../dto/threaded-size.dto';

export default class ThreadedSizeSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const sizes: CreateThreadedSizeDto[] = [
      {
        size: '1/2 X 20',
        reference: '1/2.28',
      },
      {
        size: '1/2 X 28',
        reference: '1/2.28',
      },
      {
        size: 'M9 X 0.75',
        reference: '1/2.28',
      },
    ];
    const repository = dataSource.getRepository(ThreadedSize);
    for (const size of sizes) {
      await repository.insert([
        {
          size: size.size,
          reference: size.reference,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
