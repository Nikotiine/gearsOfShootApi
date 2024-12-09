import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OpticReadyPlate } from '../entity/optic-ready-plate.entity';

export default class OpticReadyPlateSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const plates = [
      {
        name: 'Trigicon',
        reference: 'TGT',
        description: 'description0',
      },
      {
        name: 'Exemple1',
        reference: 'EX1',
        description: 'description0',
      },
      {
        name: 'Exemple2',
        reference: 'EX2',
        description: 'description0',
      },
      {
        name: 'Exemple3',
        reference: 'EX3',
        description: 'description0',
      },
    ];

    const repository = dataSource.getRepository(OpticReadyPlate);
    for (const plate of plates) {
      await repository.insert([
        {
          name: plate.name,
          description: plate.description,
          reference: plate.reference,
        },
      ]);
    }
  }
}
