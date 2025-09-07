import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Supplier } from '../entity/supplier.entity';
import { CreateSupplierDto } from '../../dto/supplier.dto';

export default class SupplierSeeder implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const suppliers: CreateSupplierDto[] = [
      {
        name: 'Supplier 1',
        address: 'adress',
        phoneNumber: 'fdsfdsdf',
        city: 'city',
        country: 'state',
        zipCode: 'ZIP',
        siret: 'street',
      },
      {
        name: 'Supplier 2',
        address: 'adress',
        phoneNumber: 'fdsfdsdf',
        city: 'city',
        country: 'state',
        zipCode: 'ZIP',
        siret: 'street',
      },
    ];
    const repository = dataSource.getRepository(Supplier);
    for (const supplier of suppliers) {
      await repository.insert([
        {
          name: supplier.name,
          address: supplier.address,
          phoneNumber: supplier.phoneNumber,
          city: supplier.city,
          country: supplier.country,
          zipCode: supplier.zipCode,
          siret: supplier.siret,
        },
      ]);
    }
  }
}
