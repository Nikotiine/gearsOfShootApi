import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Factory } from '../entity/factory.entity';
import { FactoryType } from '../../enum/factory-types.enum';
import { CreateFactoryDto } from '../../dto/factory.dto';

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
    const factoriesW: CreateFactoryDto[] = [
      {
        name: 'CZ',
        description: 'Description',
        ref: 'CZ',
        type: FactoryType.WEAPON,
      },
      {
        name: 'Taurus',
        description: 'Description',
        ref: 'TAU',
        type: FactoryType.WEAPON,
      },
      {
        name: 'Winchester',
        description: 'Description',
        ref: 'WIN',
        type: FactoryType.WEAPON,
      },
      {
        name: 'KMR',
        description: 'Description',
        ref: 'KMR',
        type: FactoryType.WEAPON,
      },
      {
        name: 'Glock',
        description: 'Description',
        ref: 'GLK',
        type: FactoryType.WEAPON,
      },
      {
        name: 'SK',
        description: 'Description',
        ref: 'SK',
        type: FactoryType.AMMUNITION,
      },
      {
        name: 'Lapua',
        description: 'Description',
        ref: 'LAP',
        type: FactoryType.AMMUNITION,
      },
      {
        name: 'RWS',
        description: 'Description',
        ref: 'RWS',
        type: FactoryType.AMMUNITION,
      },
      {
        name: 'Aguila',
        description: 'Description',
        ref: 'AGL',
        type: FactoryType.AMMUNITION,
      },
      {
        name: 'SAK',
        description: 'Description',
        ref: 'SAK',
        type: FactoryType.SOUND_NOISE_REDUCER,
      },
      {
        name: 'Nielsen',
        description: 'Description',
        ref: 'NIEL',
        type: FactoryType.SOUND_NOISE_REDUCER,
      },
      {
        name: 'Atec',
        description: 'Description',
        ref: 'ATC',
        type: FactoryType.SOUND_NOISE_REDUCER,
      },
      {
        name: 'Konus',
        description: 'Description',
        ref: 'KNS',
        type: FactoryType.OPTIC,
      },
      {
        name: 'Vortex optics',
        description: 'Description',
        ref: 'VOROPT',
        type: FactoryType.OPTIC,
      },
      {
        name: 'Vector optics',
        description: 'Description',
        ref: 'VECOPT',
        type: FactoryType.OPTIC,
      },
    ];
    const repository = dataSource.getRepository(Factory);
    for (const factory of factoriesW) {
      await repository.insert([
        {
          name: factory.name,
          factoryType: factory.type,
          description: factory.description,
          ref: factory.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
