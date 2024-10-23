import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AmmunitionHeadType } from '../entity/ammunition-head-type.entity';
import { CreateAmmunitionHeadTypeDto } from '../../dto/ammunition.dto';

export default class AmmunitionHeadTypeSeeder implements Seeder {
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
    const heads: CreateAmmunitionHeadTypeDto[] = [
      {
        name: 'Plomb',
        ref: 'PLB',
      },
      {
        name: 'FMJ',
        ref: 'FMJ',
      },
      {
        name: 'Cuivre',
        ref: 'CUI',
      },
      {
        name: 'Polymere',
        ref: 'PLY',
      },
    ];
    const repository = dataSource.getRepository(AmmunitionHeadType);
    for (const head of heads) {
      await repository.insert([
        {
          name: head.name,
          ref: head.name,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
