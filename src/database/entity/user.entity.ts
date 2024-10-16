import { BaseEntity } from './base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from '../../enum/user-roles.enum';
import { promisify } from 'util';
import { pbkdf2 as _pbkdf2, randomBytes } from 'crypto';
import { CostumerRoles } from '../../enum/costumer-roles.enum';
import { VerificationCode } from './verification-code.entity';
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  city: string;
  @Column()
  zipCode: string;
  @Column()
  state: string;
  @Column({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
  @Column({ enum: CostumerRoles, default: CostumerRoles.NO_LICENSE })
  costumerRole: CostumerRoles;
  @OneToMany(
    () => VerificationCode,
    (verificationCode) => verificationCode.user,
  )
  verificationCodes: VerificationCode[];
  @BeforeInsert()
  async setPassword() {
    this.password = await this.hashPassword(this.password);
  }

  private async hashPassword(password: string): Promise<string> {
    const pbkdf2 = promisify(_pbkdf2);
    const salt = randomBytes(16).toString('hex');
    const hash = await pbkdf2(password, salt, 10000, 64, 'sha512');
    return `${salt}:${hash.toString('hex')}`;
  }
}
