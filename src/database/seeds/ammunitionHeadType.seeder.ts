import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AmmunitionHeadType } from '../entity/ammunitionHeadType.entity';

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
    const names: string[] = ['Plomb', 'FMJ', 'Cuivre', 'Polymere'];
    const repository = dataSource.getRepository(AmmunitionHeadType);
    for (const name of names) {
      await repository.insert([
        {
          name: name,
        },
      ]);
    }

    // ---------------------------------------------------
  }
}
