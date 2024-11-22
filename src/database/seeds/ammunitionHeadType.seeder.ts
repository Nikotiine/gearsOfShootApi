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
        reference: 'PLB',
      },
      {
        name: 'FMJ',
        reference: 'FMJ',
      },
      {
        name: 'Cuivre',
        reference: 'CUI',
      },
      {
        name: 'Polymere',
        reference: 'PLY',
      },
    ];
    const repository = dataSource.getRepository(AmmunitionHeadType);
    for (const head of heads) {
      await repository.insert([
        {
          name: head.name,
          reference: head.name,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
