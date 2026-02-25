import { CustomBase } from './custom-base';
import { Column, Entity } from 'typeorm';

@Entity()
export class MLockOption extends CustomBase {
  @Column()
  name: string;
}
