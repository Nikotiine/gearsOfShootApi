import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AmmunitionBodyType } from '../entity/ammunition-body-type.entity';
import { CreateAmmunitionBodyTypeDto } from '../../dto/ammunition.dto';

export default class AmmunitionBodyTypeSeeder implements Seeder {
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
    const bodys: CreateAmmunitionBodyTypeDto[] = [
      {
        name: 'Laiton',
        ref: 'LTN',
      },
      {
        name: 'Cuivre',
        ref: 'CUI',
      },
      {
        name: 'Inox',
        ref: 'INX',
      },
    ];
    const repository = dataSource.getRepository(AmmunitionBodyType);
    for (const body of bodys) {
      await repository.insert([
        {
          name: body.name,
          ref: body.ref,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
