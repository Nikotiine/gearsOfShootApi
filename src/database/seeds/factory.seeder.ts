import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Factory } from '../entity/factory.entity';

import { CreateFactoryDto, CreateFactoryTypeDto } from '../../dto/factory.dto';
import { FactoryType } from '../entity/factory-type.entity';
import { FactoryTypeEnum } from '../../enum/factory-type.enum';

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
      name: FactoryTypeEnum.WEAPON,
    };
    const ammoFactory: CreateFactoryTypeDto = {
      name: FactoryTypeEnum.AMMUNITION,
    };
    const opticFactory: CreateFactoryTypeDto = {
      name: FactoryTypeEnum.OPTIC,
    };
    const magFactory: CreateFactoryTypeDto = {
      name: FactoryTypeEnum.MAGAZINE,
    };
    const accessoriesFactory: CreateFactoryTypeDto = {
      name: FactoryTypeEnum.ACCESSORY,
    };
    const factoryTypeRepo = dataSource.getRepository(FactoryType);
    const wf = await factoryTypeRepo.save(weaponFactory);
    const af = await factoryTypeRepo.save(ammoFactory);
    const of = await factoryTypeRepo.save(opticFactory);
    const mf = await factoryTypeRepo.save(magFactory);
    const accf = await factoryTypeRepo.save(accessoriesFactory);

    const factoriesW: CreateFactoryDto[] = [
      {
        name: 'CZ',
        description: 'Description',
        type: wf,
      },
      {
        name: 'Taurus',
        description: 'Description',
        type: wf,
      },
      {
        name: 'Winchester',
        description: 'Description',
        type: wf,
      },
      {
        name: 'KMR',
        description: 'Description',
        type: wf,
      },
      {
        name: 'Glock',
        description: 'Description',
        type: wf,
      },
      {
        name: 'SK',
        description: 'Description',
        type: af,
      },
      {
        name: 'Lapua',
        description: 'Description',
        type: af,
      },
      {
        name: 'RWS',
        description: 'Description',
        type: af,
      },
      {
        name: 'Aguila',
        description: 'Description',
        type: af,
      },
      {
        name: 'SAK',
        description: 'Description',
        type: accf,
      },
      {
        name: 'Nielsen',
        description: 'Description',
        type: accf,
      },
      {
        name: 'Atec',
        description: 'Description',
        type: accf,
      },
      {
        name: 'Konus',
        description: 'Description',
        type: of,
      },
      {
        name: 'Vortex optics',
        description: 'Description',
        type: of,
      },
      {
        name: 'Vector optics',
        description: 'Description',
        type: of,
      },
      {
        name: 'MagPul',
        description: 'Description',
        type: mf,
      },
      {
        name: 'CZ',
        description: 'Description',
        type: mf,
      },
      {
        name: 'Taurus',
        description: 'Description',
        type: mf,
      },
      {
        name: 'Winchester',
        description: 'Description',
        type: mf,
      },
      {
        name: 'Accesory 1',
        description: 'Description',
        type: accf,
      },
      {
        name: 'Accesory 2',
        description: 'Description',
        type: accf,
      },
    ];
    const repository = dataSource.getRepository(Factory);
    for (const factory of factoriesW) {
      await repository.insert([
        {
          name: factory.name,
          type: factory.type,
          description: factory.description,
          reference: `${factory.type.name.substring(0, 3)}/${factory.name.substring(0, 3)}`,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
