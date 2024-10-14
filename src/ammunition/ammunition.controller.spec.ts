import { Test, TestingModule } from '@nestjs/testing';
import { AmmunitionController } from './ammunition.controller';

describe('AmmunitionController', () => {
  let controller: AmmunitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmunitionController],
    }).compile();

    controller = module.get<AmmunitionController>(AmmunitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
