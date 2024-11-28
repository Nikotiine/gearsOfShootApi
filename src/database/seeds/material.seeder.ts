import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Material } from '../entity/material.entity';

export default class MaterialSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const bodies: any = [
      {
        name: 'Polymere',
        reference: 'POL',
      },
      {
        name: 'Acier',
        reference: 'ACR',
      },
      {
        name: 'Bois',
        reference: 'BOI',
      },
      {
        name: 'Aluminium',
        reference: 'ALU',
      },
    ];
    const repository = dataSource.getRepository(Material);
    for (const body of bodies) {
      await repository.insert([
        {
          name: body.name,
          reference: body.reference,
        },
      ]);
    }
  }
}
