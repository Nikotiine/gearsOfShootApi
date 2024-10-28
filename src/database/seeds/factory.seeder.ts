import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Factory } from '../entity/factory.entity';

import { CreateFactoryDto, CreateFactoryTypeDto } from '../../dto/factory.dto';
import { FactoryType } from '../entity/factoryType.entity';

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
    const weaponFactory: CreateFactoryTypeDto = {
      name: 'weapon',
    };
    const ammoFactory: CreateFactoryTypeDto = {
      name: 'ammunition',
    };
    const opticFactory: CreateFactoryTypeDto = {
      name: 'optic',
    };
    const rdsFactory: CreateFactoryTypeDto = {
      name: 'rds',
    };

    const factoryTypeRepo = dataSource.getRepository(FactoryType);
    const wf = await factoryTypeRepo.save(weaponFactory);
    const af = await factoryTypeRepo.save(ammoFactory);
    const of = await factoryTypeRepo.save(opticFactory);
    const rf = await factoryTypeRepo.save(rdsFactory);

    const factoriesW: CreateFactoryDto[] = [
      {
        name: 'CZ',
        description: 'Description',
        ref: 'CZ',
        typeId: wf.id,
      },
      {
        name: 'Taurus',
        description: 'Description',
        ref: 'TAU',
        typeId: wf.id,
      },
      {
        name: 'Winchester',
        description: 'Description',
        ref: 'WIN',
        typeId: wf.id,
      },
      {
        name: 'KMR',
        description: 'Description',
        ref: 'KMR',
        typeId: wf.id,
      },
      {
        name: 'Glock',
        description: 'Description',
        ref: 'GLK',
        typeId: wf.id,
      },
      {
        name: 'SK',
        description: 'Description',
        ref: 'SK',
        typeId: af.id,
      },
      {
        name: 'Lapua',
        description: 'Description',
        ref: 'LAP',
        typeId: af.id,
      },
      {
        name: 'RWS',
        description: 'Description',
        ref: 'RWS',
        typeId: af.id,
      },
      {
        name: 'Aguila',
        description: 'Description',
        ref: 'AGL',
        typeId: af.id,
      },
      {
        name: 'SAK',
        description: 'Description',
        ref: 'SAK',
        typeId: rf.id,
      },
      {
        name: 'Nielsen',
        description: 'Description',
        ref: 'NIEL',
        typeId: rf.id,
      },
      {
        name: 'Atec',
        description: 'Description',
        ref: 'ATC',
        typeId: rf.id,
      },
      {
        name: 'Konus',
        description: 'Description',
        ref: 'KNS',
        typeId: of.id,
      },
      {
        name: 'Vortex optics',
        description: 'Description',
        ref: 'VOROPT',
        typeId: of.id,
      },
      {
        name: 'Vector optics',
        description: 'Description',
        ref: 'VECOPT',
        typeId: of.id,
      },
    ];
    const repository = dataSource.getRepository(Factory);
    for (const factory of factoriesW) {
      await repository.insert([
        {
          name: factory.name,
          type: {
            id: factory.typeId,
          },
          description: factory.description,
          ref: factory.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
