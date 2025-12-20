import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OpticUnit } from '../entity/optic-unit.entity';
import { OpticClick } from '../entity/optic-click.entity';

export default class OpticUnitSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const units: any = [
      {
        name: 'MOA',
      },
      {
        name: 'MRAD',
      },
    ];
    const unitRepository = dataSource.getRepository(OpticUnit);
    const clickRepository = dataSource.getRepository(OpticClick);
    const opticUnits = await unitRepository.save(units);

    // Mapping rapide pour retrouver les ids
    const unitMap = Object.fromEntries(opticUnits.map((u) => [u.name, u.id]));

    // ---- 2) Seed des clicks ----
    const clickValues = [
      { name: '1/8', unit: 'MOA' },
      { name: '1/4', unit: 'MOA' },
      { name: '1/2', unit: 'MOA' },
      { name: '1/10', unit: 'MRAD' },
    ];

    const clickEntities = clickValues.map((c) => ({
      name: c.name,
      opticUnit: { id: unitMap[c.unit] }, // ✔ bon id, relation OK
    }));

    await clickRepository.save(clickEntities);
  }
}
