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
    const rdsFactory: CreateFactoryTypeDto = {
      name: FactoryTypeEnum.RDS,
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
    const rf = await factoryTypeRepo.save(rdsFactory);
    const mf = await factoryTypeRepo.save(magFactory);
    const accf = await factoryTypeRepo.save(accessoriesFactory);

    const factoriesW: CreateFactoryDto[] = [
      {
        name: 'CZ',
        description: 'Description',
        reference: 'CZ',
        typeId: wf.id,
      },
      {
        name: 'Taurus',
        description: 'Description',
        reference: 'TAU',
        typeId: wf.id,
      },
      {
        name: 'Winchester',
        description: 'Description',
        reference: 'WIN',
        typeId: wf.id,
      },
      {
        name: 'KMR',
        description: 'Description',
        reference: 'KMR',
        typeId: wf.id,
      },
      {
        name: 'Glock',
        description: 'Description',
        reference: 'GLK',
        typeId: wf.id,
      },
      {
        name: 'SK',
        description: 'Description',
        reference: 'SK',
        typeId: af.id,
      },
      {
        name: 'Lapua',
        description: 'Description',
        reference: 'LAP',
        typeId: af.id,
      },
      {
        name: 'RWS',
        description: 'Description',
        reference: 'RWS',
        typeId: af.id,
      },
      {
        name: 'Aguila',
        description: 'Description',
        reference: 'AGL',
        typeId: af.id,
      },
      {
        name: 'SAK',
        description: 'Description',
        reference: 'SAK',
        typeId: rf.id,
      },
      {
        name: 'Nielsen',
        description: 'Description',
        reference: 'NIEL',
        typeId: rf.id,
      },
      {
        name: 'Atec',
        description: 'Description',
        reference: 'ATC',
        typeId: rf.id,
      },
      {
        name: 'Konus',
        description: 'Description',
        reference: 'KNS',
        typeId: of.id,
      },
      {
        name: 'Vortex optics',
        description: 'Description',
        reference: 'VOROPT',
        typeId: of.id,
      },
      {
        name: 'Vector optics',
        description: 'Description',
        reference: 'VECOPT',
        typeId: of.id,
      },
      {
        name: 'MagPul',
        description: 'Description',
        reference: 'MAGPUL',
        typeId: mf.id,
      },
      {
        name: 'CZ',
        description: 'Description',
        reference: 'CZ',
        typeId: mf.id,
      },
      {
        name: 'Taurus',
        description: 'Description',
        reference: 'TAU',
        typeId: mf.id,
      },
      {
        name: 'Winchester',
        description: 'Description',
        reference: 'WIN',
        typeId: mf.id,
      },
      {
        name: 'Accesory 1',
        description: 'Description',
        reference: 'ACC1',
        typeId: accf.id,
      },
      {
        name: 'Accesory 2',
        description: 'Description',
        reference: 'ACC2',
        typeId: accf.id,
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
          reference: factory.reference,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
