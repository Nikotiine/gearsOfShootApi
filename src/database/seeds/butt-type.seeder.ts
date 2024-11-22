import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponMagazineBodyType } from '../entity/weapon-magazine-body-type.entity';
import { WeaponButtType } from '../entity/weapon-butt-type.entity';

export default class ButtTypeSeeder implements Seeder {
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
    const repository = dataSource.getRepository(WeaponButtType);
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
