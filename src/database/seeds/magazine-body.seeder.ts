import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WeaponMagazineBodyType } from '../entity/weapon-magazine-body-type.entity';

export default class MagazineBodySeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const bodies: any = [
      {
        name: 'Polymere',
      },
      {
        name: 'Acier',
      },
      {
        name: 'Aluminium',
      },
    ];
    const repository = dataSource.getRepository(WeaponMagazineBodyType);
    for (const body of bodies) {
      await repository.insert([
        {
          name: body.name,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
