import { CustomBase } from './custom-base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class VerificationCode extends CustomBase {
  @Column()
  code: number;
  @Column()
  expireAt: Date;
  @ManyToOne(() => User, (user) => user.verificationCodes)
  user: User;
}
