import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TriggerType } from '../entity/trigger-type.entity';

export default class TriggerTypeSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const types: any = [
      {
        ref: 'SA',
        name: 'Simple action',
      },
      {
        ref: 'SA/DA',
        name: 'Simple et double action',
      },
      {
        ref: 'DA',
        name: 'Double action',
      },
      {
        ref: 'ST',
        name: 'Strike fire',
      },
    ];
    const reloadRepository = dataSource.getRepository(TriggerType);
    for (const type of types) {
      await reloadRepository.insert([
        {
          name: type.name,
          reference: type.ref,
        },
      ]);
    }
  }
}
