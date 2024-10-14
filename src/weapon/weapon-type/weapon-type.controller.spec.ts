import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypeController } from './weapon-type.controller';

describe('WeaponTypeController', () => {
  let controller: WeaponTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponTypeController],
    }).compile();

    controller = module.get<WeaponTypeController>(WeaponTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
