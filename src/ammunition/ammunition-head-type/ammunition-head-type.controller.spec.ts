import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionHeadTypeController } from './ammunition-head-type.controller';

describe('AmmunitionHeadTypeController', () => {
  let controller: AmmunitionHeadTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionHeadTypeController],
    }).compile();

    controller = module.get<AmmunitionHeadTypeController>(AmmunitionHeadTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
