import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Store } from '../entity/store.entity';

export default class StoreSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const storeRepository = dataSource.getRepository(Store);

    const store = storeRepository.create({
      name: 'STORE',
      state: 'France',
      street: 'Rue du magasin',
      streetNumber: '12',
      zipCode: '38000',
      email: 'email@store',
      phone: '12345678',
      city: 'Grenoble',
    });

    await storeRepository.save(store);
  }
}
