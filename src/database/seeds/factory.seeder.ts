import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Factory } from '../entity/factory.entity';
import { FactoryType } from '../../enum/factory-types.enum';

export default class FactorySeeder implements Seeder {
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
    const weaponsFactoryNames: string[] = [
      'CZ',
      'Taurus',
      'Winchester',
      'KMR',
      'Glock',
    ];
    const repository = dataSource.getRepository(Factory);
    for (const name of weaponsFactoryNames) {
      await repository.insert([
        {
          name: name,
          factoryType: FactoryType.WEAPON,
          description: 'Description',
        },
      ]);
    }
    const ammunitionFactoryNames: string[] = [
      'RWS',
      'SK',
      'Lapua',
      'Aguila',
      'Winchester',
    ];
    for (const name of ammunitionFactoryNames) {
      await repository.insert([
        {
          name: name,
          factoryType: FactoryType.AMMUNITION,
        },
      ]);
    }

    const SNRFactoryNames: string[] = ['SAK', 'Nielsen', 'Atec'];
    for (const name of SNRFactoryNames) {
      await repository.insert([
        {
          name: name,
          factoryType: FactoryType.SOUND_NOISE_REDUCER,
        },
      ]);
    }

    const opticFactoryNames: string[] = [
      'Konus',
      'Vortex optics',
      'Vector optics',
    ];
    for (const name of opticFactoryNames) {
      await repository.insert([
        {
          name: name,
          factoryType: FactoryType.OPTIC,
        },
      ]);
    }
    // ---------------------------------------------------
  }
}
