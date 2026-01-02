import { Injectable } from '@nestjs/common';
import { SoundReducerService } from '../../accessory/sound-reducer/sound-reducer.service';
import { AmmunitionService } from '../../ammunition/ammunition.service';
import { OpticService } from '../../optic/optic.service';
import { RiffleService } from '../../weapon/riffle/riffle.service';
import { HandGunService } from '../../weapon/hand-gun/hand-gun.service';
import { DiscountedItemDto } from '../../dto/new-items.dto';
import { MagazineService } from '../../weapon/magazine/magazine.service';

@Injectable()
export class DiscountItemsService {
  constructor(
    private readonly soundReducerService: SoundReducerService,
    private readonly ammunitionService: AmmunitionService,
    private readonly opticService: OpticService,
    private readonly riffleService: RiffleService,
    private readonly handGunService: HandGunService,
    private readonly magazineService: MagazineService,
  ) {}

  public async findDiscountedItems(): Promise<DiscountedItemDto[]> {
    const optics: DiscountedItemDto[] =
      await this.opticService.findDiscountedItems();
    const ammunition: DiscountedItemDto[] =
      await this.ammunitionService.findDiscountedItems();
    const magazines: DiscountedItemDto[] =
      await this.magazineService.findDiscountedItems();
    const rds: DiscountedItemDto[] =
      await this.soundReducerService.findDiscountedItems();
    const riffles: DiscountedItemDto[] =
      await this.riffleService.findDiscountedItems();
    const handguns: DiscountedItemDto[] =
      await this.handGunService.findDiscountedItems();
    return [
      ...riffles,
      ...handguns,
      ...optics,
      ...ammunition,
      ...rds,
      ...magazines,
    ];
  }
}
