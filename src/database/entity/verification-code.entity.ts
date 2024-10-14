import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class VerificationCode extends BaseEntity {
  @Column()
  code: number;
  @Column()
  expireAt: Date;
  @ManyToOne(() => User, (user) => user.verificationCodes)
  user: User;
}
