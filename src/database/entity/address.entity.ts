import { CustomBase } from './custom-base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address extends CustomBase {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  additionalStreet: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  state: string;

  @Column()
  additionalInformation: string;

  @ManyToOne(() => User, (user) => user.addresses)
  userAddress: User;
}
