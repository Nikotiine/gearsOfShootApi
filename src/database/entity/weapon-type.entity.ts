import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { WeaponReloadMode } from './weapon-reload-mode.entity';
import { Riffle } from './riffle.entity';
import { HandGun } from './hand-gun.entity';
import { WeaponMagazine } from './weapon-magazine.entity';
import { WeaponTypeEnum } from '../../enum/weapon-type.enum';

@Entity()
export class WeaponType extends BaseEntity {
  // Type d'arme
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => WeaponReloadMode, (mode) => mode.weaponTypes)
  mode: WeaponReloadMode;

  @Column({
    enum: WeaponTypeEnum,
    default: WeaponTypeEnum.RIFFLE,
  })
  type: WeaponTypeEnum;

  @Column()
  reference: string;

  @OneToMany(() => Riffle, (riffle) => riffle.type)
  riffles: Riffle[];

  @OneToMany(() => HandGun, (handgun) => handgun.type)
  handguns: HandGun[];

  @OneToMany(() => WeaponMagazine, (magazine) => magazine.forWeaponType)
  magazines: WeaponMagazine[];
}
