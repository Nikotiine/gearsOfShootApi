import { Injectable } from '@nestjs/common';
import { SoundReducerService } from '../../accessory/sound-reducer/sound-reducer.service';
import { AmmunitionService } from '../../ammunition/ammunition.service';
import { OpticService } from '../../optic/optic.service';
import { NewItemsDto } from '../../dto/new-items.dto';
import { RiffleService } from '../../weapon/riffle/riffle.service';
import { HandGunService } from '../../weapon/hand-gun/hand-gun.service';
import { MagazineService } from '../../weapon/magazine/magazine.service';
import { OpticCollarService } from '../../optic/optic-collar/optic-collar.service';

@Injectable()
export class NewItemsService {
  constructor(
    private readonly soundReducerService: SoundReducerService,
    private readonly ammunitionService: AmmunitionService,
    private readonly opticService: OpticService,
    private readonly riffleService: RiffleService,
    private readonly handGunService: HandGunService,
    private readonly magazineService: MagazineService,
    private readonly opticCollarService: OpticCollarService,
  ) {}

  public async findNewItems(): Promise<NewItemsDto[]> {
    const lastRds: NewItemsDto = await this.soundReducerService.findLastEntry();
    const lastAmmunitionCatB: NewItemsDto =
      await this.ammunitionService.findLastEntry('B');
    const lastAmmunitionCatC: NewItemsDto =
      await this.ammunitionService.findLastEntry('C');
    const lastOptic: NewItemsDto = await this.opticService.findLastEntry();
    const lastRiffleCatB: NewItemsDto =
      await this.riffleService.findLastEntry('B');
    const lastRiffleCatC: NewItemsDto =
      await this.riffleService.findLastEntry('C');
    const lastPistolet: NewItemsDto =
      await this.handGunService.findLastEntry('Pistolet');
    const lastRevolver: NewItemsDto =
      await this.handGunService.findLastEntry('Revolver');
    const lastMagazineCatC: NewItemsDto =
      await this.magazineService.findLastEntry('C');
    const lastMagazineCatB: NewItemsDto =
      await this.magazineService.findLastEntry('B');
    const lastOpticCollar: NewItemsDto =
      await this.opticCollarService.findLastEntry();
    return [
      lastRiffleCatB,
      lastRiffleCatC,
      lastRevolver,
      lastPistolet,
      lastAmmunitionCatB,
      lastAmmunitionCatC,
      lastOptic,
      lastRds,
      lastMagazineCatC,
      lastMagazineCatB,
      lastOpticCollar,
    ];
  }
}
