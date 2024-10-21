import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

import { CreateUserDto } from '../../dto/user.dto';
import { promisify } from 'util';
import { pbkdf2 as _pbkdf2, randomBytes } from 'crypto';
import { UserRoles } from '../../enum/user-roles.enum';

export default class UserSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const users: CreateUserDto[] = [
      {
        lastName: 'user',
        firstName: 'user',
        role: UserRoles.USER,
        email: 'user@user.fr',
        address: 'user adress',
        city: 'user city',
        phone: '06060606060',
        state: 'France',
        zipCode: '38000',
        password: await this.hashPassword('password'),
        //  costumerRole: CostumerRoles.NO_LICENSE,
      },
      {
        lastName: 'admin',
        firstName: 'admin',
        role: UserRoles.ADMIN,
        email: 'admin@admin.fr',
        address: 'admin adress',
        city: 'admin city',
        phone: '06060606060',
        state: 'France',
        zipCode: '38000',
        password: await this.hashPassword('password'),
        //  costumerRole: CostumerRoles.NO_LICENSE,
      },
    ];
    const repository = dataSource.getRepository(User);
    for (const user of users) {
      await repository.insert([user]);
    }

    // ---------------------------------------------------
  }

  private async hashPassword(password: string): Promise<string> {
    const pbkdf2 = promisify(_pbkdf2);
    const salt = randomBytes(16).toString('hex');
    const hash = await pbkdf2(password, salt, 10000, 64, 'sha512');
    return `${salt}:${hash.toString('hex')}`;
  }
}
