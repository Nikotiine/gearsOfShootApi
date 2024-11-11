import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WeaponMagazine } from './weapon-magazine.entity';
@Entity()
export class WeaponMagazineBodyType extends BaseEntity {
  @Column()
  name: string;
  @OneToMany(() => WeaponMagazine, (magazine) => magazine.body)
  magazines: WeaponMagazine;
}
