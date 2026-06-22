import { CustomBase } from './custom-base';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Address } from './address.entity';
@Entity()
export class Store extends CustomBase {
  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  state: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
