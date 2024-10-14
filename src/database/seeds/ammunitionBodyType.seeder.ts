import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AmmunitionBodyType } from '../entity/ammunitionBodyType.entity';

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
    const names: string[] = ['Laiton', 'Cuivre', 'Inox'];
    const repository = dataSource.getRepository(AmmunitionBodyType);
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
