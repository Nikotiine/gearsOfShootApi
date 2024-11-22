import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WeaponMagazine } from './weapon-magazine.entity';
@Entity()
export class WeaponMagazineBodyType extends BaseEntity {
  // Nom du type de matiere pour les chargeurs
  @Column({ unique: true })
  name: string;

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.body)
  magazines: WeaponMagazine;
}
