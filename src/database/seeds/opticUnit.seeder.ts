import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OpticUnit } from '../entity/optic-unit.entity';

export default class OpticUnitSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const units: any = [
      {
        label: 'MOA',
      },
      {
        label: 'MRAD',
      },
    ];
    const repository = dataSource.getRepository(OpticUnit);
    for (const unit of units) {
      await repository.insert([
        {
          label: unit.label,
        },
      ]);
    }
  }
}
