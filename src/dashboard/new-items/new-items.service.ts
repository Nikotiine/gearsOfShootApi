import { Injectable } from '@nestjs/common';
import { SoundReducerService } from '../../accessory/sound-reducer/sound-reducer.service';
import { AmmunitionService } from '../../ammunition/ammunition.service';
import { OpticService } from '../../optic/optic.service';
import { NewItemsDto } from '../../dto/new-items.dto';
import { RiffleService } from '../../weapon/riffle/riffle.service';
import { HandGunService } from '../../weapon/hand-gun/hand-gun.service';

@Injectable()
export class NewItemsService {
  constructor(
    private readonly soundReducerService: SoundReducerService,
    private readonly ammunitionService: AmmunitionService,
    private readonly opticService: OpticService,
    private readonly riffleService: RiffleService,
    private readonly handGunService: HandGunService,
  ) {}

  public async findNewItems(): Promise<NewItemsDto[]> {
    const lastRds = await this.soundReducerService.findLastEntry();
    const lastAmmunitionCatB = await this.ammunitionService.findLastEntry('B');
    const lastAmmunitionCatC = await this.ammunitionService.findLastEntry('C');
    const lastOptic = await this.opticService.findLastEntry();
    const lastRiffleCatB = await this.riffleService.findLastEntry('B');
    const lastRiffleCatC = await this.riffleService.findLastEntry('C');
    const lastPistolet = await this.handGunService.findLastEntry('Pistolet');
    const lastRevolver = await this.handGunService.findLastEntry('Revolver');
    return [
      lastRiffleCatB,
      lastRiffleCatC,
      lastRevolver,
      lastPistolet,
      lastAmmunitionCatB,
      lastAmmunitionCatC,
      lastOptic,
      lastRds,
    ];
  }
}
